import { Request, Response, Router } from 'express'

export const testeRouter = Router()

testeRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello world!')
})
