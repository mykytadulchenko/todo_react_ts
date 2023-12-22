export const itemQueries = {
    GET_ITEMS_QUERY: 'SELECT * FROM todos WHERE user_id = $1',
    SET_ITEM_QUERY: 'INSERT INTO todos (value, "isFinished", user_id) VALUES ($1, $2, $3)',
    EDIT_ITEM_QUERY: 'UPDATE todos SET value = $1, "isFinished" = $2 WHERE id = $3',
    DELETE_ITEM_QUERY: 'DELETE FROM todos WHERE id = $1',
    SELECT_ALL_QUERY: 'UPDATE todos SET "isFinished" = $1 WHERE user_id = $2',
    DELETE_SELECTED: 'DELETE FROM todos WHERE "isFinished" = true AND user_id = $1'
}

export const userQueries = {
    SET_USER_QUERY: 'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING id, login',
    GET_USER_QUERY: 'SELECT * FROM users WHERE login = $1'
}