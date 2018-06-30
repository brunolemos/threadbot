import { RTMClient } from '@slack/client'

const token = process.env.SLACK_TOKEN

if (!token) throw new Error('[ENV] Missing environment variable: SLACK_TOKEN')

const rtm = new RTMClient(token)
rtm.start()

rtm.on('user_typing', ({ channel }) => {
  rtm.sendTyping(channel)
})

export default function() {
  return `${rtm.connected}`
}
