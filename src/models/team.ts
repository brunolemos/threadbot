import mongoose from '../init/mongoose'

// workaround for hot reload error
// https://github.com/kriasoft/react-starter-kit/issues/1418
delete mongoose.connection.models.Team

export interface Team extends mongoose.Document {
  _id: string
  access_token: string
  bot: { _id: string; access_token: string }
  id: string
  name: string
  scope: string
  users: string[]
}

export const teamSchema = new mongoose.Schema({
  _id: String,
  access_token: String,
  bot: { _id: String, access_token: String },
  id: String,
  name: String,
  scope: String,
  users: [String],
} as Record<keyof Team, any>)

export const Team = mongoose.model<Team>('Team', teamSchema)
