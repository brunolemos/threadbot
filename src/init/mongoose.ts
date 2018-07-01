import * as mongoose from 'mongoose'

export const mongodbURI = process.env.MONGODB_URI!
if (!mongodbURI) throw new Error('[ENV] Missing environment variable: MONGODB_URI')

mongoose.connect(mongodbURI)

export default mongoose
