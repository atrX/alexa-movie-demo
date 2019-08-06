import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	context.res = {
		body: new ResponseBuilder()
			.say('Exiting Alexa movie demo.')
			.endSession()
			.build()
	}
}
export default httpTrigger
