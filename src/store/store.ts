import { createStore } from "redux"

class Store {
    data: Array<IListItem>

    constructor() {
       this.data = this.getTasks()
    }

    getTasks() {
        return JSON.parse(localStorage.getItem('todos') as string) || []
    }

    setTasks(data: Array<IListItem>) {
        const sortedData = data.sort((a, b) => a.id - b.id)
        localStorage.setItem('todos', JSON.stringify(sortedData))
    }
}

const storage = new Store()

const initialState: IState = {
    data: storage.data,
    filter: null,
    selectAll: true
}

const reducer = (state: IState = initialState, action: IAction):IState => {
    switch(action.type) {
        case 'SET_FILTER':
            return {...state, filter: action.payload}
        case 'SELECT_ALL':
            const selectedAllData = state.data.map(el => ({...el, isFinished: state.selectAll}))
            storage.setTasks(selectedAllData)
            return {...state, selectAll: !state.selectAll, data: selectedAllData}
        case 'ADD_ITEM':
            const newItem = {id: state.data.at(-1)!?.id + 1 || 0, value: action.payload, isFinished: false}
            const newItemData = [...state.data]
            newItemData.push(newItem)
            storage.setTasks(newItemData)
            return {...state, data: newItemData}
        case 'CHECK_ITEM':
            const checkItem = { ...action.payload, isFinished: !action.payload.isFinished }
            const newCheckedData = state.data.filter((el) => el.id !== action.payload.id)
            newCheckedData.push(checkItem)
            storage.setTasks(newCheckedData)
            return {...state, data: newCheckedData}
        case 'REMOVE_ITEM':
            const dataWithoutItem = state.data.filter((el) => el.id !== action.payload.id)
            storage.setTasks(dataWithoutItem)
            return {...state, data: dataWithoutItem}
        case 'EDIT_ITEM':
            const editedItem = { ...action.payload.item, value: action.payload.value }
            const editedItemData = state.data.filter((el) => el.id !== action.payload.item.id)
            editedItemData.push(editedItem)
            storage.setTasks(editedItemData)
            return {...state, data: editedItemData}
        case 'REMOVE_SELECTED':
            const selectedRemovedData = state.data.filter(el => !el.isFinished)
            storage.setTasks(selectedRemovedData)
            return {...state, data: selectedRemovedData}
        default: return state
    }
}

const store = createStore(reducer)

export default store