export default function makeGetFood ({ retrieveFood }) {
  return async function getFood (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { id } = httpRequest.params
      const food = await retrieveFood({ id })
      return {
        headers,
        statusCode: 200,
        body: { food }
      }
    } catch (e) {
      // TODO: Error logging
      if (e.name === 'RangeError') {
        return {
          headers,
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }

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
