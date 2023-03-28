import { Express } from 'express'
import { Movie } from '../../interfaces/movies.interface'

declare global {
  namespace Express {
    interface Request {
      movie: Movie
    }
  }
}
