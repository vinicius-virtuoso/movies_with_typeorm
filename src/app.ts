import { testeRouter } from './routes/teste.routes'
import express from 'express'

export const app = express()
app.use(express.json())

app.use('/teste', testeRouter)
