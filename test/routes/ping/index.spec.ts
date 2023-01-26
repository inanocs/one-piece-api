import { build } from '../../helper.js'

const app = build()
describe('Test suite', () => {
  test('default ping route', async () => {
    const res = await app.inject({
      url: '/ping',
    })
    expect(res.json()).toEqual({ message: 'Pong' })
  })
})
