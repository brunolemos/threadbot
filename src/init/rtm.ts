import { RTMClient } from '@slack/client'

export const slackToken = process.env.SLACK_TOKEN!
if (!slackToken) console.debug('[ENV] Missing environment variable: SLACK_TOKEN')

let appRTM: RTMClient | undefined
if (slackToken) {
  appRTM = new RTMClient(slackToken)
  appRTM.start()
}

export default appRTM
