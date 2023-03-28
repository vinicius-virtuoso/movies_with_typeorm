import 'express-async-errors'
import { moviesRouter } from './routes/movies.routes'
import express from 'express'
import { errorHandler } from './errors'

const app = express()
app.use(express.json())

app.use('/movies', moviesRouter)

app.use(errorHandler)

export default app
