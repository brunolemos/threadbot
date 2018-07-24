import { WebClient } from '@slack/client'

export const slackClientId = process.env.SLACK_CLIENT_ID!
export const slackClientSecret = process.env.SLACK_CLIENT_SECRET!
export const slackClientVerificationToken = process.env.SLACK_CLIENT_VERIFICATION_TOKEN!

if (!slackClientId) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_ID')
if (!slackClientSecret) throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_SECRET')
if (!slackClientVerificationToken)
  throw new Error('[ENV] Missing environment variable: SLACK_CLIENT_VERIFICATION_TOKEN')

const web = new WebClient()

export default web
