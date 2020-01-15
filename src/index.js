import bodyParser from 'body-parser'
import express from 'express'
import { foodsRoutes } from './routes'

const app = express()

app.use(bodyParser.json())

const apiRoot = process.env.API_ROOT

app.use(`${apiRoot}/foods`, foodsRoutes)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`🚀Server running at port ${PORT}`)
})
