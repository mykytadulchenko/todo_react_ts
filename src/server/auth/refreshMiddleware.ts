import { NextFunction, Request, Response } from "express"
import jwtResolver from "./jwtResolver.js"
import jwt from "jsonwebtoken"

export const refreshMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.authorization!.split(' ')[1] as string
        const decodedData = jwtResolver.decodePayload(token!)
        const tokens = await jwtResolver.getTokens(decodedData.id)
        jwtResolver.verifyToken(tokens.refresh_token)
        const { accessToken, refreshToken } = jwtResolver.generateTokens({ id: decodedData.id, login: decodedData.login})
        await jwtResolver.setTokens(decodedData.id, accessToken, refreshToken)
        response.setHeader('Authorization', `Bearer ${accessToken}`)
        next()
    } catch(err: any) {
        if(err instanceof jwt.TokenExpiredError) {
            response.status(401)
            next()
        }
    }
    
}

export default refreshMiddleware