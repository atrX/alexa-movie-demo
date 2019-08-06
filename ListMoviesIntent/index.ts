import * as _ from 'lodash'
import { handleException } from '../shared/lib/ExceptionHandler'
import ResponseBuilder from '../shared/lib/ResponseBuilder'

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import Movie, { IMovie } from '../shared/models/Movie'
import MovieRepository from '../shared/repositories/MovieRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	try {
		let movies = await MovieRepository.getMoviesToWatch()

		let response: string = movies.length > 0
			? 'Here\'s your current watch list.'
			: 'You do not have any movies on your watch list.'

		for (let [key, movie] of movies.entries()) {
			response = response.concat(` ${key + 1}: ${movie.title}.`)
		}

		context.res = {
			body: new ResponseBuilder()
				.say(response)
				.build()
		}
	} catch (err) {
		context.res = handleException(err)
	}
}
export default httpTrigger
