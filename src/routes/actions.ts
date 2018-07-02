import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { decodeHookRequest } from '../helpers'

export default [
  post('/actions/reply-use-thread', async (req, res) => {
    const payload = await decodeHookRequest(req)

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: `<@${payload.message.user}> Please use thread instead 🙌`,
      thread_ts: payload.message.ts,
    })

    send(res, 200)
  }),
]
