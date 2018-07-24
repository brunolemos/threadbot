import { Team } from '../models/team'
// import { initTypeFeatureForTeam } from './typing'
import { initFloodFeature } from './flood'

export async function initAllFeaturesForTeam(team: Team) {
  console.log('Init all features for team', team._id)
  // await initTypeFeatureForTeam(team)
  await initFloodFeature()
}
