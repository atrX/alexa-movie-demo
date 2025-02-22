import config from './config'
import { Mongoose } from 'mongoose'

const mongoose = new Mongoose()
mongoose.connect(
	config.mongo.connectionString,
	{
		useNewUrlParser: true,
		useCreateIndex: true
	}
).then(() => {
	console.log('MongoDB connected')
}).catch(err => {
	console.log(err)
})

export default mongoose
