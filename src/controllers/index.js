import {
  addFood,
  editFood,
  listFoods,
  removeFood,
  retrieveFood
} from '../use-cases'
import makeDeleteFood from './delete-food'
import makeGetFood from './get-food'
import makeGetFoods from './get-foods'
import makePatchFood from './patch-food'
import makePostFood from './post-food'

const deleteFood = makeDeleteFood({ removeFood })
const getFoods = makeGetFoods({ listFoods })
const getFood = makeGetFood({ retrieveFood })
const postFood = makePostFood({ addFood })
const patchFood = makePatchFood({ editFood })

const foodController = Object.freeze({
  deleteFood,
  getFoods,
  getFood,
  postFood,
  patchFood
})

export default foodController
export { deleteFood, getFoods, getFood, postFood, patchFood }
