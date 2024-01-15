import jwt from 'jsonwebtoken'
import { authQueries } from '../../db/typeorm/queries/authQueries.js'
import { configDotenv } from 'dotenv'
configDotenv()

class JwtResolver {
    secret: string 

    constructor(secret: string) {
        this.secret = secret
    }

    generateTokens = (payload: Record<string, string>) => {
        return {
            accessToken: jwt.sign(payload, this.secret, { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE) }),
            refreshToken: jwt.sign(payload, this.secret, { expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRE) })
        }
    }

    verifyToken = (token: string) => {
        return jwt.verify(token, this.secret)
    }

    decodePayload = (token: string) => {
        return jwt.decode(token, {complete: true})!.payload as jwt.JwtPayload
    }

    getTokens = async (id: string) => {
        const tokens = await authQueries.GET_TOKENS(id) as Record<string, any>
        return tokens
    }
    
    setTokens = async (id: string, accessToken: string, refreshToken: string) => {
        await authQueries.SET_TOKENS(id, accessToken, refreshToken)
    }
}

const jwtResolver = new JwtResolver(process.env.JWT_SECRET!)

export default jwtResolver