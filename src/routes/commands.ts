import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { getParsedBody } from '../helpers'

export default [
  post('/commands/thread', async (req, res) => {
    const payload = await getParsedBody(req, res)

    const text = `${payload.text || ''}`.trim()
    if (!text) {
      send(res, 200, 'A title is required to start a thread.')
      return
    }

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: `[THREAD] <@${payload.user_id}>: ${text}`,
    })

    send(res, 200)
  }),
  post('/commands/thread-reminder', async (req, res) => {
    const payload = await getParsedBody(req, res)

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: 'Friendly reminder: Please always use threads when possible 💙',
    })

    send(res, 200)
  }),
]
