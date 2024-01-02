import { createConnection } from "typeorm"
import dbData from "../connect.js"
import Item from "../entities/Item.js"

export const itemQueries = {
    GET_ITEMS_QUERY: async (id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        const data = await entityRepos.find({ where: { user_id: id }, order: { created_at: 'ASC' }})
        await connection.close()
        return data
    },
    SET_ITEM_QUERY: async (value, completed, user_id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.insert({value, completed, user_id})
        await connection.close()
    },
    EDIT_ITEM_QUERY: async (value, completed, id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.update({ id }, { value, completed , updated_at: new Date()})
        await connection.close()
    },
    DELETE_ITEM_QUERY: async (id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.delete({ id })
        await connection.close()
    },
    SELECT_ALL_QUERY: async (selectAll, user_id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.update({ user_id }, { completed: selectAll })
        await connection.close()
    },
    DELETE_SELECTED: async (user_id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.delete({ user_id, completed: true })
        await connection.close()
    }
}