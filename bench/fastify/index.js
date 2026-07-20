const fastify = require('fastify')({ logger: false })

fastify.addHook('onSend', (req, reply, payload, done) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Cache-Control', 'no-store')
  done(null, payload)
})

async function hello(req, reply) {
  reply.type('text/plain').send('hello world')
}

fastify.get('/', hello)
fastify.get('/fastify', hello)

fastify.listen({ port: 3000, host: '0.0.0.0' }, () => {
  console.log('fastify listening on :3000')
})
