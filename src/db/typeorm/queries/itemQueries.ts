import initializeDatabase from "../connect.js"
import Item from "../entities/Item.js"
import User from "../entities/User.js"

export const itemQueries = {
    GET_ITEMS_QUERY: async (id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        const data = await entityRepos.find({ where: { user: { id } }, order: { created_at: 'ASC' }}) 
        return data
    },
    SET_ITEM_QUERY: async (value: string, completed: boolean, user_id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        const user = new User()
        user.id = user_id
        await entityRepos.insert({value, completed, user})
    },
    EDIT_ITEM_QUERY: async (value: string, completed: boolean, id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        await entityRepos.update({ id }, { value, completed })
    },
    DELETE_ITEM_QUERY: async (id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        await entityRepos.delete({ id })
    },
    SELECT_ALL_QUERY: async (selectAll: boolean, user_id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        await entityRepos.update({ user: { id: user_id } }, { completed: selectAll })
    },
    DELETE_SELECTED: async (user_id: string) => {
        const dbDataSource = await initializeDatabase()
        const entityRepos = dbDataSource.getRepository(Item)
        await entityRepos.delete({ user: { id: user_id}, completed: true })
    }
}