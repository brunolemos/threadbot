import mongoose from '../init/mongoose'

// workaround for hot reload error
// https://github.com/kriasoft/react-starter-kit/issues/1418
delete mongoose.connection.models.Team

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
