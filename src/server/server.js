import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './serverRoutes.js'

const PORT = 3001
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use('/api', router)


server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})