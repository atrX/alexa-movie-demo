import ResponseBuilder from './ResponseBuilder'

export function handleException (err: any): Object {
	console.log('Exception caught', err)
	return {
		body: new ResponseBuilder()
			.say('There was a problem handling your request.')
			.endSession()
			.build()
	}
}
