import mongoose from '../init/mongoose'

export const teamSchema = new mongoose.Schema({
  _id: String,
  access_token: String,
  bot: { _id: String, access_token: String },
  id: String,
  name: String,
  scope: String,
  users: [String],
})

export default mongoose.model('Team', teamSchema)
