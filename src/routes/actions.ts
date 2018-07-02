import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { getParsedBody } from '../helpers'

export default [
  post('/actions/reply-use-thread', async (req, res) => {
    const body = await getParsedBody(req, res)
    const payload = JSON.parse(body.payload)

    const userId = payload.message.user

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: `${userId ? `<@${userId}> ` : ''}Please use thread instead 🙌`,
      thread_ts: payload.message.ts,
    })

    send(res, 200)
  }),
  post('/actions/start-thread', async (req, res) => {
    const body = await getParsedBody(req, res)
    const payload = JSON.parse(body.payload)

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: '[THREAD] ⬇️',
      thread_ts: payload.message.ts,
    })

    send(res, 200)
  }),
]
