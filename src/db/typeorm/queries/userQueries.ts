import { createConnection } from "typeorm"
import User from "../entities/User.js"
import { IUser } from "../../../interfaces"
import initializeDatabase from "../connect.js"

export const userQueries = {
    SET_USER_QUERY: async (login: string, email: string, password: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(User)
        const user = entityRepos.create({ login, email, password })
        const returnData = await entityRepos.save(user) as IUser
        return {
            id: returnData.id,
            login: returnData.login
        }
    },
    GET_USER_QUERY: async (login: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(User)
        const user = await entityRepos.findOneBy({ login }) as IUser
        return user
    }
}