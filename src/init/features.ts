import { initAllFeaturesForTeam } from '../features'
import { Team } from '../models/team'

export async function initAllFeatures() {
  const teams = await Team.find()

  teams.forEach(async team => {
    await initAllFeaturesForTeam(team.toObject())
  })
}
