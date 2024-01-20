import jwt from 'jsonwebtoken'
import { errorActionTypes } from '../../store/actions/actionTypes.js'
import jwtResolver from "./jwtResolver.js"

const tokenRefresher = async (token: string) => {
    try {
        jwtResolver.verifyToken(token)
        return token
    } catch(err: any) {
        if(err instanceof jwt.TokenExpiredError) {
            try {
                const decodedData = jwtResolver.decodePayload(token)
                const tokens = await jwtResolver.getTokens(decodedData.id)
                jwtResolver.verifyToken(tokens.refresh_token)
                const { accessToken, refreshToken } = jwtResolver.generateTokens({ id: decodedData.id, login: decodedData.login})
                await jwtResolver.setTokens(decodedData.id, accessToken, refreshToken)
                return accessToken
            } catch(err: any) {
                return { action: {type: errorActionTypes.authError, payload: err.message}, token: null }
            }
        } else {
            return { type: errorActionTypes.authError, payload: err.message }
        }
    }
} 

export default tokenRefresher