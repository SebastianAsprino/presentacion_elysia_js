const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  })
  next()
})

app.get(['/', '/express'], (req, res) => {
  res.type('text/plain').send('hello world')
})

app.listen(3000, () => {
  console.log('express listening on :3000')
})
