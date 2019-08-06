import { config } from 'dotenv'
config()

export default {
	apiUrl: process.env.API_URL,
	mongo: {
		connectionString: process.env.MONGO_CONNECTION_STRING
	}
}
