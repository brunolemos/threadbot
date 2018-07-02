import { startRTMForTeam } from '../init/rtm'
import { Team } from '../models/team'

export function initTypeFeatureForTeam(team: Team) {
  console.debug(`[TYPING] Listening to user_typing on team ${team._id}.`)
  const rtm = startRTMForTeam(team)

  rtm.off('user_typing')
  rtm.on('user_typing', ({ channel }) => {
    rtm!.sendTyping(channel)
  })
}
