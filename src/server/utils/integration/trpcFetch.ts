import fetch from 'node-fetch'

export default async function trpcFetch({
  path,
  method,
  input,
}: {
  path: string
  method: 'POST' | 'GET'
  input?: object
}) {
  console.log(input)
  const inputString = JSON.stringify({ 0: { json: input ?? {} } })
  console.log(inputString)

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

  console.log(response)

  type ResponseJson = {
    result?: { data: { json: Record<any, any> } }
    error?: { json: { message: string } }
  }

  let responseJson = (await response.json()) as ResponseJson | ResponseJson[]

  if (Array.isArray(responseJson)) {
    responseJson = responseJson[0]
  }

  return {
    response,
    data: responseJson.result?.data.json,
    error:
      ![401, 403].some((status) => status === response.status) &&
      responseJson.error
        ? (JSON.parse(responseJson.error.json.message) as Record<any, any>)
        : undefined,
  }
}
