import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { getParsedBody } from '../helpers'

export default [
  post('/actions', async (req, res) => {
    const body = await getParsedBody(req, res)
    const payload = JSON.parse(body.payload)

    const userId = payload.message.user

    switch (payload.callback_id) {
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
