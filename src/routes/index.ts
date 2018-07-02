import { send } from 'micro'
import { get } from 'microrouter'

export default [
  get('/', (_req, res) => {
    send(res, 200, { ok: true })
  }),
]
