import * as _ from 'lodash'
import { handleException } from '../shared/lib/ExceptionHandler'
import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { IMovie } from '../shared/models/Movie'
import MovieRepository from '../shared/repositories/MovieRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	try {
		const movie = await MovieRepository.addMovie({
			title: _.get(req.body, 'slots.movie.value')
		} as IMovie)

		context.res = {
			body: new ResponseBuilder()
				.say(`Alright, I've added ${movie.title} to your list!`)
				.build()
		}
	} catch (err) {
		context.res = handleException(err)
	}
}
export default httpTrigger
