const queries = {
    GET_ITEMS_QUERY: 'SELECT * FROM todos ORDER BY id ASC',
    SET_ITEM_QUERY: 'INSERT INTO todos (value, "isFinished") values($1, $2)',
    EDIT_ITEM_QUERY: 'UPDATE todos SET value = $1, "isFinished" = $2 WHERE id = $3',
    DELETE_ITEM_QUERY: 'DELETE FROM todos WHERE id = $1',
    SELECT_ALL_QUERY: 'UPDATE todos SET "isFinished" = $1',
    DELETE_SELECTED: 'DELETE FROM todos WHERE "isFinished" = true'
}

export default queries