import { RTMClient } from '@slack/client'

import { Team } from '../models/team'

const _rtmByTeam = new Map<string, RTMClient>()

export function getRTMForTeam(teamId: string) {
  return _rtmByTeam.get(teamId)
}

export function startRTMForTeam(team: Team) {
  if (!getRTMForTeam(team._id)) _rtmByTeam.set(team._id, new RTMClient(team.bot.access_token))
  const rtm = getRTMForTeam(team._id)!

  if (!rtm.connected) rtm.start()

  return rtm
}
