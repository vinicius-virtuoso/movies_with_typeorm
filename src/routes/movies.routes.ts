import { Router } from 'express'
import { movieCreateSchema, movieUpdateSchema } from '../schemas'
import { moviesController } from '../controllers/movies.controller'
import { validateBody } from '../middlewares/validateBody.middleware'
import {
  verifyMovieExists,
  verifyMovieNotExists,
  verifyMovieUpdateName,
} from '../middlewares/movie.middleware'

export const moviesRouter = Router()

moviesRouter.get('/', moviesController.findMany)
moviesRouter.get('/:id', verifyMovieNotExists, moviesController.findOne)

moviesRouter.post(
  '/',
  validateBody(movieCreateSchema),
  verifyMovieExists,
  moviesController.create
)

moviesRouter.patch(
  '/:id',
  validateBody(movieUpdateSchema),
  verifyMovieNotExists,
  verifyMovieUpdateName,
  moviesController.update
)

moviesRouter.delete('/:id', verifyMovieNotExists, moviesController.delete)
