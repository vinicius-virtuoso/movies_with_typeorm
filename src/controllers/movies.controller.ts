import {
  deleteMovieService,
  getOneMoviesService,
} from './../services/movie.service'
import { Request, Response } from 'express'
import {
  getMoviesService,
  createMovieService,
  updateMovieService,
} from '../services/movie.service'
import { iMovieCreate } from '../interfaces'

class MoviesController {
  async findMany(req: Request, res: Response) {
    const { page = 1, perPage = 5, sort, order } = req.query

    const movies = await getMoviesService(
      Number(page),
      Number(perPage),
      String(sort),
      String(order)
    )

    return res.status(200).json(movies)
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params
    const movies = await getOneMoviesService(id)

    return res.status(201).json(movies)
  }

  async create(req: Request, res: Response) {
    const { name, description = null, duration, price } = req.body
    const movieBody: iMovieCreate = { name, description, duration, price }

    const movie = await createMovieService(movieBody)

    return res.status(201).json(movie)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const movieBody = req.body

    const movie = await updateMovieService(id, movieBody)

    res.status(200).json(movie)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    await deleteMovieService(id)

    res.status(204).json()
  }
}

export const moviesController = new MoviesController()
