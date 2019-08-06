import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	context.res = {
		body: new ResponseBuilder()
			.say('I\'m sorry, I didn\'t get that.')
			.build()
	}
}
export default httpTrigger
