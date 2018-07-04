import { Team } from '../models/team'
// import { initTypeFeatureForTeam } from './typing'

export async function initAllFeaturesForTeam(team: Team) {
  console.log('Init all features for team', team._id)
  // await initTypeFeatureForTeam(team)
}
