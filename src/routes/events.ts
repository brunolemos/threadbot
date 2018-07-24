import { send } from 'micro'
import { post } from 'microrouter'

import * as flood from '../features/flood'
import { getParsedBody } from '../helpers'
import web, { slackClientVerificationToken } from '../init/web'
import { Team } from '../models/team'

export default [
  post('/events', async (req, res) => {
    const body = await getParsedBody(req, res)
    const { challenge, event, event_time: timestamp, team_id: teamID, token, type } = body

    if (token !== slackClientVerificationToken) {
      send(res, 401)
      return
    }

    if (type === 'url_verification') {
      send(res, 200, challenge)
      return
    }

    if (!(event && event.type)) {
      send(res, 400, 'No event received')
      return
    }

    // disable flood control inside threads
    if (event.thread_ts) {
      send(res, 200)
      return
    }

    switch (event.type) {
      case 'message': {
        const userID = (event.comment && event.comment.user) || event.user
        if (
          event.subtype === 'file_share' ||
          event.subtype === 'file_comment' ||
          (!event.subtype && !event.hidden)
        ) {
          flood.registerTemporaryMessage({
            channelID: event.channel,
            isFile: event.subtype === 'file_share',
            messageID: event.client_msg_id || event.event_ts,
            teamID,
            threadID: event.thread_ts,
            timestamp,
            userID,
          })

          const isFlooding = flood.isUserFloodingThread({
            channelID: event.channel,
            teamID,
            threadID: event.thread_ts,
            userID,
          })

          if (isFlooding) {
            const team = await Team.findById(teamID)

            if (!(team && (team.bot || {}).access_token)) {
              send(res, 400, `Failed to get the access token for the team ${teamID}.`)
              return
            }

            await web.chat.postMessage({
              as_user: true,
              channel: userID,
              text:
                'I detected multiple messages in a row in a short time. \n' +
                'Please edit them to use a single message instead. 💙 \n' +
                'This way, people can easily reply to the right one using threads.',
              token: team!.bot.access_token,
            })
          }

          send(res, 200)
          return
        }

        switch (event.subtype) {
          case 'message_changed': {
            send(res, 200)
            return
          }

          case 'message_deleted': {
            flood.removeMessage({
              channelID: event.channel,
              messageID: event.previous_message.client_msg_id || event.previous_message.ts,
              teamID,
              threadID: event.thread_ts,
            })
            send(res, 200)
            return
          }

          default: {
            console.log('[events] unknown message event subtype:', event.subtype)
            send(res, 200)
            return
          }
        }
      }

      default: {
        console.log('[events] unknown event type:', event.type)
        send(res, 200)
        return
      }
    }
  }),
]
