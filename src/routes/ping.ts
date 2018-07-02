import { send } from 'micro'
import { post } from 'microrouter'

export default [
  post('/ping', async (_req, res) => {
    send(res, 200)
  }),
]
