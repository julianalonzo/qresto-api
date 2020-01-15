import makeFoodModel from './food-model'
import makeFoodsDb from './foods-db'

const foodsDataAccess = Object.freeze({
  makeFoodsDb,
  makeFoodModel
})

export default foodsDataAccess
export { makeFoodsDb, makeFoodModel }
