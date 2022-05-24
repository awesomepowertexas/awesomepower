import fetch from 'node-fetch'

/**
 * Helper function to request a trpc route during integration tests.
 */
export default async function trpcFetch({
  path,
  method,
  input,
}: {
  path: string
  method: 'POST' | 'GET'
  input?: object
}) {
  const inputString = JSON.stringify({ 0: { json: input ?? {} } })

  const response = await fetch(
    `http://localhost:3000/api/trpc/${path}?batch=1${
      input && method === 'GET'
        ? `&input=${encodeURIComponent(inputString)}`
        : ''
    }`,
    {
      method,
      body: input && method === 'POST' ? inputString : undefined,
    },
  )

  type ResponseJson =
    | {
        result: { data: { json: Record<any, any> } }
        error?: never
      }
    | {
        result?: never
        error: { json: { message: string } }
      }

  let responseJson = (await response.json()) as ResponseJson | ResponseJson[]

  if (Array.isArray(responseJson)) {
    responseJson = responseJson[0]
  }

  if (responseJson.error) {
    try {
      var errorMessageObject = JSON.parse(
        responseJson.error.json.message,
      ) as Record<any, any>
    } catch (error) {
      errorMessageObject = { message: responseJson.error.json.message }
    }

    return {
      response,
      error: errorMessageObject,
    }
  }

  return {
    response,
    data: responseJson.result.data.json,
  }
}
