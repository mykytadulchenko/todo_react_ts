import type { FC, KeyboardEvent } from 'react'
import type { ThunkDispatch } from 'redux-thunk'
import type { IListItem, IState } from "../../interfaces"
import type { IListItemComponent } from "../../interfaces/components"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "../../store/actions/actions"
import styles from "./ListItem.module.css"

const ListItem:FC<IListItemComponent> = ({ itemData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(itemData.value)
  const dispatch = useDispatch<ThunkDispatch<IState, any, any>>()

  const checkItem = (item: IListItem) => dispatch(actions.editItem({...item, isFinished: !item.isFinished}))
  const removeItem = (item: IListItem) => dispatch(actions.removeItem(item))
  const edit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return
    dispatch(actions.editItem({...itemData, value}))
    setIsEditing(false)
  }

  const rootClass = useMemo(() => isEditing ? [styles.list__item, styles.editing] : [styles.list__item], [isEditing])

  return (
    <li className={rootClass.join(" ")}>
      {isEditing ? (
        <div>
          <input
            type="text"
            autoFocus
            value={value}
            onKeyUp={edit}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <>
          <div
            className={styles.check__container}
            onClick={() => checkItem(itemData)}
          >
            <div className={styles.check__body}>
              <i className="fa-regular fa-square fa-sm"></i>
            </div>
            {itemData.isFinished ? (
              <div className={styles.check__active}>
                <i className="fa-solid fa-check fa-sm"></i>
              </div>
            ) : null}
          </div>
          <p onDoubleClick={() => setIsEditing(true)}>{itemData.value}</p>
          <button
            className={styles.remove__btn}
            onClick={() => removeItem(itemData)}
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
        </>
      )}
    </li>
  )
}
export default ListItem
