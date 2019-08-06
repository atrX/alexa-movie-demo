import Movie, { IMovie } from '../models/Movie'

export default class MovieRepository {

	public static async addMovie (movie: IMovie) {
		return await Movie.create(movie)
	}

	public static async removeMovie (movie: IMovie) {
		return await Movie.remove(movie)
	}

	public static async getMoviesToWatch (limit: number = 5) {
		return await Movie.find({})
			.limit(limit)
			.lean() as IMovie[]
	}
}
