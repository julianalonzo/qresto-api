import express from 'express'
import foodControllers from '../controllers/food'
import makeCallback from '../express-callback'
import makeFoodsRoutes from './foods'

const router = express.Router()

const foodsRoutes = makeFoodsRoutes({ router, makeCallback, foodControllers })

const routes = Object.freeze({
  foodsRoutes
})

export default routes
export { foodsRoutes }
