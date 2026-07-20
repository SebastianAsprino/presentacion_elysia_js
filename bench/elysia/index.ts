import { Elysia } from 'elysia'

new Elysia()
  .onAfterHandle(({ set }) => {
    set.headers['access-control-allow-origin'] = '*'
    set.headers['cache-control'] = 'no-store'
  })
  .get('/', () => 'hello world')
  .get('/elysia', () => 'hello world')
  .listen(3000, () => {
    console.log('elysia listening on :3000')
  })
