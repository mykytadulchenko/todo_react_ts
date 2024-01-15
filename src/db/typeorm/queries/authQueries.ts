import initializeDatabase from "../connect.js"
import Jwt from "../entities/Jwt.js"
import User from "../entities/User.js"

export const authQueries = {
    GET_TOKENS: async (id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Jwt)
        const data = await entityRepos.findOneBy({ user: { id } })
        return data
    },
    SET_TOKENS: async (id: string, accessToken: string, refreshToken: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Jwt)
        const user = new User()
        user.id = id
        await entityRepos.upsert({user, access_token: accessToken, refresh_token: refreshToken }, ['id'])
    },
}