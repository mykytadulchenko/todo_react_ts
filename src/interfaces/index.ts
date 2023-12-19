export interface IListItem {
    id: number
    value: string
    isFinished: boolean
}

export interface IState {
    data: Array<IListItem>
    filter: string
    selectAll: boolean
}

export interface IAction {
    type: string
    payload?: any
}