import bodyParser from 'body-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import itemRouter from './itemRouter.js'
import userRouter from './userRouter.js'

configDotenv()
const PORT = process.env.PORT || 3001
const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/api/todos', itemRouter)
server.use('/api/users', userRouter)
server.use((err: any, _: Request, response: Response, next: NextFunction) => {
    console.log(err)
    response.status(500).json('Something went wrong!')
})

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})
