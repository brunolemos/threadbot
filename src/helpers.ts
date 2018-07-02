import * as bodyParser from 'body-parser'
import { NextHandleFunction } from 'connect'
import { ServerRequest, ServerResponse } from 'microrouter'

export async function applyMiddleware(
  req: ServerRequest,
  res: ServerResponse,
  fn: NextHandleFunction,
) {
  return await new Promise((resolve, reject) =>
    fn(req, res, (error: any) => (error ? reject(error) : resolve())),
  )
}

export async function getParsedBody(req: ServerRequest, res: ServerResponse) {
  await applyMiddleware(req, res, bodyParser.json({ strict: false }))
  await applyMiddleware(req, res, bodyParser.urlencoded({ extended: false }))

  return (req as any).body
}
