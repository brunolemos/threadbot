import { RTMClient } from '@slack/client'

export const slackClientId = process.env.SLACK_CLIENT_ID!
export const slackClientSecret = process.env.SLACK_CLIENT_SECRET!
export const slackToken = process.env.SLACK_TOKEN!

if (!slackClientId) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_ID')
if (!slackClientSecret) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_SECRET')
if (!slackToken) throw new Error('[ENV] Missing environment variable: SLACK_TOKEN')

const rtm = new RTMClient(slackToken)

rtm.start()

export default rtm
