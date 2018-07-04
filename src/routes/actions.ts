import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { getParsedBody } from '../helpers'
import web from '../init/web'
import { Team } from '../models/team'

export default [
  post('/actions', async (req, res) => {
    const body = await getParsedBody(req, res)
    const payload = JSON.parse(body.payload)

    const userId = payload.message.user
    let team: Team | null

    if (['add_reaction', 'remove_reaction'].includes(payload.callback_id)) {
      team = await Team.findById(payload.team.id)
      if (!(team && (team.bot || {}).access_token)) {
        send(res, 400, `Failed to get the access token for the team ${payload.team.id}.`)
        return
      }
    }

    switch (payload.callback_id) {
      case 'add_reaction': {
        await web.reactions.add({
          channel: payload.channel.id,
          name: 'eyes',
          timestamp: payload.message_ts || payload.message.ts,
          token: team!.bot.access_token,
        })
        break
      }

      case 'remove_reaction': {
        await web.reactions.remove({
          channel: payload.channel.id,
          name: 'eyes',
          timestamp: payload.message_ts || payload.message.ts,
          token: team!.bot.access_token,
        })
        break
      }

      case 'start_thread': {
        await axios.post(payload.response_url, {
          response_type: 'in_channel',
          text: '[THREAD] ⬇️',
          thread_ts: payload.message.ts,
        })
        break
      }

      case 'use_thread': {
        await axios.post(payload.response_url, {
          response_type: 'in_channel',
          text: `${userId ? `<@${userId}> ` : ''}Please use thread instead 🙌`,
          thread_ts: payload.message.ts,
        })
        break
      }
    }

    send(res, 200)
  }),
]
