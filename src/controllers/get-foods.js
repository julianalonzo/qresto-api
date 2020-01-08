export default function makeGetFoods ({ listFoods }) {
  return async function getFoods (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const foods = await listFoods({ ...httpRequest.query })

      return {
        headers,
        statusCode: 200,
        body: foods
      }
    } catch (e) {
      // TODO: Error logging
      console.error(e)

      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
