import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	context.res = {
		body: new ResponseBuilder()
			.say('Welcome to the Alexa movie demo.')
			.build()
	}
}
export default httpTrigger
