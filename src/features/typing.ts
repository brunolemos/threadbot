import rtm from '../init/rtm'

rtm.on('user_typing', ({ channel }) => {
  rtm.sendTyping(channel)
})
