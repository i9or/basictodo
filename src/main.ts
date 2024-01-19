import {Hono} from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

Bun.serve({
  fetch: app.fetch,
  port: 1337
})

