import type { IListItem, IState } from "../../interfaces"

export const getDataSelector = (state: IState):Array<IListItem> => state.data
export const selectAllSelector = (state: IState):boolean => state.selectAll
export const filterSelector = (state: IState):null | string => state.filter