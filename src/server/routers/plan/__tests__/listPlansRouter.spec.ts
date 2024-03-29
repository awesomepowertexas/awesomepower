import { expect, test } from 'vitest'
import trpcFetch from '~/src/server/utils/integration/trpcFetch'

test('returns plans for valid zip codes', async () => {
  const { response, data } = await trpcFetch({
    path: 'plan.all',
    method: 'GET',
    input: { zipCode: '77077' },
  })

  expect(response.status).to.equal(200)
  expect(data!.length).to.equal(54)
})

test('returns no plans for invalid zip codes', async () => {
  const { response, data } = await trpcFetch({
    path: 'plan.all',
    method: 'GET',
    input: { zipCode: '00000' },
  })

  expect(response.status).to.equal(200)
  expect(data!.length).to.equal(0)
})
