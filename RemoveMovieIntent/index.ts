import * as _ from 'lodash'
import { handleException } from '../shared/lib/ExceptionHandler'
import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { IMovie } from '../shared/models/Movie'
import MovieRepository from '../shared/repositories/MovieRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	try {
		const movie = {
			title: _.get(req.body, 'slots.movie.value')
		} as IMovie

		await MovieRepository.removeMovie(movie)

		context.res = {
			body: new ResponseBuilder()
				.say(`Alright, I've removed ${movie.title} from your list!`)
				.build()
		}
	} catch (err) {
		context.res = handleException(err)
	}
}
export default httpTrigger
