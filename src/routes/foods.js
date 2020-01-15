export default function makeFoodsRoutes ({ router, makeCallback, foodControllers }) {
  const { deleteFood, getFood, getFoods, patchFood, postFood } = foodControllers

  router.post('/', makeCallback(postFood))
  router.delete('/', makeCallback(deleteFood))
  router.delete('/:id', makeCallback(deleteFood))
  router.patch('/', makeCallback(patchFood))
  router.patch('/:id', makeCallback(patchFood))
  router.get('/', makeCallback(getFoods))
  router.get('/:id', makeCallback(getFood))

  return router
}
