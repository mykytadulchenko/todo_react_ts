import { configDotenv } from "dotenv"
import type { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import jwtResolver from "./jwtResolver.js"
configDotenv()

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    let token = null
    try {
        token = request.headers.authorization!.split(' ')[1] as string
        jwtResolver.verifyToken(token)
        next()
    } catch(err: any) {
        // try {
            if(err instanceof jwt.TokenExpiredError) {
                // const decodedData = jwtResolver.decodePayload(token!)
                // const tokens = await jwtResolver.getTokens(decodedData.id)
                // jwtResolver.verifyToken(tokens.refresh_token)
                response.status(403).send()
            } else {
                //console.log(err)
                response.status(401).json('User not authorized!')
            }
        // } catch(err: any) {
        //     //console.log(err)
        //     response.status(401).json('User not authorized!')
        // }  
    }
}