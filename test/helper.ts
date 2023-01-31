import { server } from '../src/server/server.js'

export function build() {
  const app = server

  beforeAll(async () => {
    await app.Start()
    await app.serverInstance.ready()
  })

  afterAll(async () => {
    await app.Close()
  })

  return app.serverInstance
}
