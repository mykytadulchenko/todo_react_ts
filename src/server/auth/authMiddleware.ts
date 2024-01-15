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
        try {
            if(err instanceof jwt.TokenExpiredError) {
                const decodedData = jwtResolver.decodePayload(token!)
                const tokens = await jwtResolver.getTokens(decodedData.id)
                jwtResolver.verifyToken(tokens.refresh_token)
                const { accessToken, refreshToken } = jwtResolver.generateTokens({ id: decodedData.id, login: decodedData.login})
                await jwtResolver.setTokens(decodedData.id, accessToken, refreshToken)
                request.token = accessToken
                next()
            } else {
                console.log(err)
                response.status(403).json('Bad authorization!')
            }
        } catch(err: any) {
            console.log(err)
            response.status(403).json('User not authorized!')
        }  
    }
}