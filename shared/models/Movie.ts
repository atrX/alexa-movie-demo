import mongoose from '../database'
import { Document, Schema } from 'mongoose'

export interface IMovie extends Document {
	title: string
}

const MovieSchema: Schema = new Schema({
	title: { type: String, required: true, unique: true }
})

export default mongoose.model<IMovie>('Movie', MovieSchema)
