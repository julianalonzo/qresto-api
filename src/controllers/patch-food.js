export default function makePatchFood ({ editFood }) {
  return async function patchFood (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const toEdit = {
        ...httpRequest.body,
        id: httpRequest.params.id
      }

      const patched = await editFood(toEdit)
      return {
        headers,
        statusCode: 200,
        body: { patched }
      }
    } catch (e) {
      // TODO: error logging
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
