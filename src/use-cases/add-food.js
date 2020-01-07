import makeFood from '../food'

export default function makeAddFood ({ foodsDb }) {
  return async function addFood (foodInfo) {
    const food = makeFood(foodInfo)

    const exists = await foodsDb.findById({ id: food.getId() })
    if (exists) {
      return exists
    }

    return foodsDb.insert({
      id: food.getId(),
      name: food.getName(),
      description: food.getDescription(),
      price: food.getPrice(),
      available: food.isAvailable(),
      restaurantId: food.getRestaurantId()
    })
  }
}
