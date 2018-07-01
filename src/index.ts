import { WebAPICallResult } from '@slack/client'
import { send } from 'micro'
import { get, router } from 'microrouter'

import rtm, { slackClientId, slackClientSecret } from './init/rtm'
import web from './init/web'

import './features/typing'

export default router(
  get('/', (_req, res) => send(res, 200, { ok: `${rtm.connected}` })),

  get('/oauth', async (req, res) => {
    const { code, error } = req.query

    if (error) {
      send(res, 400, { ok: false, message: error })
      return
    }

    if (!code) {
      send(res, 400, { ok: false, message: 'Missing required paremeter: code' })
      return
    }

    let response
    try {
      response = await web.oauth.access({
        code,
        client_id: slackClientId,
        client_secret: slackClientSecret,
      })
      if (!(response && response.ok)) throw new Error('Invalid response')
    } catch (error) {
      console.error(error)
      send(res, 500, { ok: false, ...(error.data || error) })
      return
    }

    const {
      // access_token,
      scope,
      user_id,
      team_name,
      team_id,
      bot: { bot_user_id /* bot_access_token */ },
      scopes,
    } = (response || {}) as WebAPICallResult & Record<string, any>

    send(res, 200, { ok: true, bot_user_id, scope, scopes, team_id, team_name, user_id })

    // res.setHeader(
    //   'Location',
    //   `https://slack.com/app_redirect?channel=general${team_id ? `&team=${team_id}` : ''}`,
    // )
    // send(res, 302)
  }),
)
