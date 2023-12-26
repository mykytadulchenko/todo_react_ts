import { createConnection } from "typeorm"
import dbData from "../connect.js"
import Item from "../entities/Item.js"

export const itemQueries = {
    GET_ITEMS_QUERY: async (id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        const data = await entityRepos.find({ where: { user_id: id }, order: { created: 'ASC' }})
        await connection.close()
        return data
    },
    SET_ITEM_QUERY: async (value, isFinished, user_id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.insert({value, isFinished, user_id})
        await connection.close()
    },
    EDIT_ITEM_QUERY: async (value, isFinished, id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.update({ id }, { value, isFinished , modified: new Date()})
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
        await entityRepos.update({ user_id }, { isFinished: selectAll })
        await connection.close()
    },
    DELETE_SELECTED: async (user_id) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(Item)
        await entityRepos.delete({ user_id, isFinished: true })
        await connection.close()
    }
}