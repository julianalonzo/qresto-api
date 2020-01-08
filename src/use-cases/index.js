import { foodsDb } from '../data-access'
import makeAddFood from './add-food'
import makeEditFood from './edit-food'
import makeListFoods from './list-foods'
import makeRemoveFood from './remove-food'

const addFood = makeAddFood({ foodsDb })
const editFood = makeEditFood({ foodsDb })
const listFoods = makeListFoods({ foodsDb })
const removeFood = makeRemoveFood({ foodsDb })

const foodsService = Object.freeze({
  addFood,
  editFood,
  listFoods,
  removeFood
})

export default foodsService
export { addFood, editFood, listFoods, removeFood }
