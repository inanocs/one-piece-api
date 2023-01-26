import { server } from '../src/server/server.js'

export function build() {
  const app = server

  beforeAll(async () => {
    await app.Start().then(() => app.serverInstance.ready())
  })

  afterAll(async () => {
    await app.serverInstance.close()
  })

  return app.serverInstance
}
