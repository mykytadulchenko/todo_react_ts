import bodyParser from 'body-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express from 'express'
import itemsRouter from './itemRoutes.js'
import usersRouter from './userRoutes.js'
configDotenv()

const PORT = process.env.PORT || 3001
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use('/api/todos', itemsRouter)
server.use('/api/users', usersRouter)
server.use((err, _, response, next) => {
    console.log(err.message)
    response.status(500).json('Something went wrong!')
})

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})
