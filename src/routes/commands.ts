import axios from 'axios'
import { send } from 'micro'
import { post } from 'microrouter'

import { getParsedBody } from '../helpers'

export default [
  post('/commands/thread-reminder', async (req, res) => {
    const payload = await getParsedBody(req, res)

    await axios.post(payload.response_url, {
      response_type: 'in_channel',
      text: 'Friendly reminder: Please always use threads when possible 💙',
    })

    send(res, 200)
  }),
]
