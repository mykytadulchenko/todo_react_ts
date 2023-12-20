import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './serverRoutes.js'
import envConfig from '../utils/envEnable.js'

const PORT = process.env.PORT || 3001
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use('/api', router)
server.use((err, _, res) => {
    console.log(err.message)
    res.status(500).send('Something went wrong!')
  })

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})