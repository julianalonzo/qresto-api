export default function makePostFood ({ addFood }) {
  return async function postFood (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const posted = await addFood(httpRequest.body)

      return {
        headers,
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)

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
