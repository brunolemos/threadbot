import { text } from 'micro'
import { ServerRequest } from 'microrouter'

export async function decodeHookRequest(req: ServerRequest) {
  let _text = await text(req)
  _text = _text.replace('payload=', '')
  _text = decodeURIComponent(_text)

  return JSON.parse(_text)
}
