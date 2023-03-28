import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { iMovieCreate, iMovieRepo, iMovieUpdate } from '../interfaces'

export const getMoviesService = async (
  page: number,
  perPage: number,
  sort?: string,
  order?: string
) => {
  if (order === 'undefined' && sort === 'undefined') {
    sort = 'id'
    order = 'asc'
  }

  if (order !== 'undefined' && sort === 'undefined') {
    sort = 'id'
    order = 'asc'
  }

  if (sort !== 'price' && sort !== 'duration') {
    sort = 'id'
  }

  if (page <= 0 || !page) {
    page = 1
  }

  if (perPage <= 0 || perPage >= 5 || !perPage) {
    perPage = 5
  }

  const moviesRepo = AppDataSource.getRepository(Movie)
  const countMovie = await moviesRepo.count()
  const totalPages = Math.ceil(countMovie / perPage)

  const movieReturn = await moviesRepo.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sort]: order,
    },
  })

  return {
    prevPage:
      page - 1 <= 0
        ? null
        : `http://localhost:3000/movies?page=${
            page - 1 > totalPages ? totalPages : page - 1
          }&perPage=${perPage}`,
    nextPage:
      page + 1 > totalPages
        ? null
        : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`,
    count: countMovie,
    data: movieReturn,
  }
}

export const getOneMoviesService = async (id: string) => {
  const moviesRepo = AppDataSource.getRepository(Movie)
  return await moviesRepo.findOneBy({ id: parseInt(id) })
}

export const createMovieService = async (payload: iMovieCreate) => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
  return await movieRepo.save(payload as Omit<iMovieCreate, 'description'>)
}

export const updateMovieService = async (id: string, payload: iMovieUpdate) => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
  const findMovie = await movieRepo.findOneBy({
    id: parseInt(id),
  })

  return await movieRepo.save({
    ...findMovie,
    ...payload,
  })
}

export const deleteMovieService = async (id: string) => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

  await movieRepo.delete({ id: parseInt(id) })
}
