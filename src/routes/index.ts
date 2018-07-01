import { send } from 'micro'
import { get } from 'microrouter'

import rtm from '../init/rtm'

export default [get('/', (_req, res) => send(res, 200, { ok: `${rtm.connected}` }))]
