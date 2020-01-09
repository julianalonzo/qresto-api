import { foodsDb } from '../data-access'
import makeAddFood from './add-food'
import makeEditFood from './edit-food'
import makeListFoods from './list-foods'
import makeRetrieveFood from './retrieve-food'
import makeRemoveFood from './remove-food'

const addFood = makeAddFood({ foodsDb })
const editFood = makeEditFood({ foodsDb })
const listFoods = makeListFoods({ foodsDb })
const retrieveFood = makeRetrieveFood({ foodsDb })
const removeFood = makeRemoveFood({ foodsDb })

const foodsService = Object.freeze({
  addFood,
  editFood,
  listFoods,
  retrieveFood,
  removeFood
})

export default foodsService
export { addFood, editFood, listFoods, retrieveFood, removeFood }
