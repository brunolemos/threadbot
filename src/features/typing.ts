import appRTM from '../init/rtm'

if (appRTM) {
  console.debug('[TYPING] Listening to user_typing on main Slack workspace.')

  appRTM.on('user_typing', ({ channel }) => {
    appRTM!.sendTyping(channel)
  })
}
