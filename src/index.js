import bodyParser from 'body-parser'
import express from 'express'
import { deleteFood, getFoods, patchFood, postFood } from './controllers'
import makeCallback from './express-callback'

const app = express()

app.use(bodyParser.json())

app.post('/foods', makeCallback(postFood))
app.delete('/foods', makeCallback(deleteFood))
app.delete('/foods/:id', makeCallback(deleteFood))
app.patch('/foods', makeCallback(patchFood))
app.patch('/foods/:id', makeCallback(patchFood))
app.get('/foods', makeCallback(getFoods))

const PORT = 4000
app.listen(PORT, () => {
  console.log(`🚀Server running at port ${PORT}`)
})
