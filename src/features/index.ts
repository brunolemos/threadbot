import { Team } from '../models/team'
import { initTypeFeatureForTeam } from './typing'

export default async function initAllFeaturesForTeam(team: Team) {
  await initTypeFeatureForTeam(team)
}
