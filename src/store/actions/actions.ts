const actions = {
    setFilter: (value: string) => ({type: 'SET_FILTER', payload: value}),
    selectAll: () => ({type: 'SELECT_ALL'}),
    removeSelected: () => ({type: 'REMOVE_SELECTED'}),
    addItem: (value: string) => ({type: 'ADD_ITEM', payload: value}),
    checkItem: (item: IListItem) => ({type: 'CHECK_ITEM', payload: item}),
    removeItem: (item: IListItem) => ({type: 'REMOVE_ITEM', payload: item}),
    editItem: (item: IListItem, value: string) => ({type: 'EDIT_ITEM', payload: {item, value}})
}

export default actions