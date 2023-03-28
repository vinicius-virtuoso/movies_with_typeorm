import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { AppError } from '../errors'

export const verifyMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body

  const movieRepo = await AppDataSource.getRepository(Movie).exist({
    where: { name: name },
  })

  if (movieRepo) {
    throw new AppError('Movie already exists.', 409)
  }

  return next()
}

export const verifyMovieNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id)

  if (!id) {
    throw new AppError('Internal Server Error', 500)
  }

  const movieRepo = await AppDataSource.getRepository(Movie).exist({
    where: { id },
  })

  if (!movieRepo) {
    throw new AppError('Movie not found', 404)
  }

  return next()
}

export const verifyMovieUpdateName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body

  if (name) {
    const movieRepo = await AppDataSource.getRepository(Movie).findOne({
      where: { name: name },
    })

    if (movieRepo) {
      throw new AppError('Movie already exists.', 409)
    }
  }

  return next()
}
