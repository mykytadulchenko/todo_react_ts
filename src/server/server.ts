import bodyParser from 'body-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import { WebSocketServer } from 'ws'
import tokenRefresher from './auth/tokenRefresher.js'
import itemRouter from './routers/itemRouter.js'
import userRouter from './routers/userRouter.js'
import { WebSocketExtended } from '../types/ws.js'
import jwtResolver from './auth/jwtResolver.js'

configDotenv()
const PORT = Number(process.env.PORT) || 3001
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use('/api/users', userRouter)
server.use((err: any, _: Request, response: Response, next: NextFunction) => {
    console.log(err)
    response.status(500).json('Something went wrong!')
})

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})

const wss = new WebSocketServer({
    port: 5000
}, () => {
    console.log(`WSS started on port ${5000}`)
})

wss.on('connection', (wsClient: WebSocketExtended) => {
    console.log('New user connected')

    wsClient.on('message', async (request: string) => {
        try {
            const id = jwtResolver.decodePayload(JSON.parse(request).token).id
            wsClient.id = id
            const { action, token } = JSON.parse(request)
            const tokenCheckResult = await tokenRefresher(token)
            if(typeof tokenCheckResult ===  'object') {
                wsClient.send(JSON.stringify(tokenCheckResult))
            } else {
                const response = await itemRouter(action, token) as string
                broadcast(response, id)
            }  
        } catch(err: any) {
            console.log(err)
        }
    })
    
    wsClient.on('close', () => {
        console.log(`User disconnected!`)
    })
})



function broadcast(response: any, roomId: string) {
    wss.clients.forEach((client: WebSocketExtended) => {
        if(client.id === roomId)
        client.send(response)
    })
}
