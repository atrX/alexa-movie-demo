import config from '../shared/config'
import { handleException } from '../shared/lib/ExceptionHandler'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios, { AxiosInstance } from 'axios'

import RequestBodyParser from '../shared/lib/RequestBodyParser'
import ResponseBuilder from '../shared/lib/ResponseBuilder'

async function delegateRequest (parser: RequestBodyParser) {
	const fetch = axios.create({
		baseURL: config.apiUrl
	})

	if (parser.type() === 'SessionEndedRequest') {
		return {
			msg: 'Ending session'
		}
	} else {
		return (
			parser.type() === 'IntentRequest'
			? await fetch.post(parser.intent().name.replace('.', '_'), parser.intent())
			: await fetch.post(parser.type())
		).data
	}
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	const parser = new RequestBodyParser(req.body)

	try {
		context.res = {
			body: await delegateRequest(parser)
		}
	} catch (err) {
		context.res = handleException(err)
	}
}
export default httpTrigger
