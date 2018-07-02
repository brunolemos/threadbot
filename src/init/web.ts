import { WebClient } from '@slack/client'

export const slackClientId = process.env.SLACK_CLIENT_ID!
export const slackClientSecret = process.env.SLACK_CLIENT_SECRET!

if (!slackClientId) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_ID')
if (!slackClientSecret) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_SECRET')

const web = new WebClient()

export default web
