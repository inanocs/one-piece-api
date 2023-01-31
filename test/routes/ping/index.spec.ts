import { build } from '../../helper.js'

describe('Test suite', () => {
  const app = build()
  test('default ping route', async () => {
    const res = await app.inject({
      url: '/ping',
    })
    expect(res.json()).toEqual({ message: 'Pong' })
  })
})
