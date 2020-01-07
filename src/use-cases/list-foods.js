export default function makeListFoods ({ foodsDb }) {
  return async function listFoods ({ ...query } = {}) {
    return foodsDb.findAll({ ...query })
  }
}
