import { IListItem } from "."

export interface IScreenComponent {
    data: Array<IListItem>
}

export interface IListItemComponent {
    key: number
    itemData: IListItem
}

export interface IFiltersComponent {
    activeCounter: number
    isAnyFinished: boolean
}