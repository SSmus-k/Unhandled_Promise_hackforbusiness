import express from 'express'
import { mockUsers } from './mockData.js'

const app = express()
const port = 3000

app.get('/api/users', (req, res) => {
  res.send(mockUsers)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
