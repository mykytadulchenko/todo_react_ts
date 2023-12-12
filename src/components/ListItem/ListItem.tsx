import { FC, KeyboardEvent, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import styles from "./ListItem.module.css"
import actions from "../../store/actions/actions"
import { IListItem } from "../../interfaces"
import { IListItemComponent } from "../../interfaces/components"

const ListItem:FC<IListItemComponent> = ({ itemData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(itemData.value)
  const dispatch = useDispatch()

  const checkItem = (item: IListItem) => dispatch(actions.checkItem(item))
  const removeItem = (item: IListItem) => dispatch(actions.removeItem(item))
  const edit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return
    dispatch(actions.editItem(itemData, value))
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
