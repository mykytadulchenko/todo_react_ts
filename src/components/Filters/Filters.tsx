import { FC, MouseEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './Filters.module.css'
import actions from '../../store/actions/actions'
import { IFiltersComponent } from '../../interfaces/components'

const Filters: FC<IFiltersComponent> = ({activeCounter, isAnyFinished}) => {
  const dispatch = useDispatch()

  const clearSelected = () => dispatch(actions.removeSelected())
  const changeFilter = (e: MouseEvent) => {
    if(active.current) active.current.className = ''
    active.current = e.target as HTMLButtonElement
    dispatch(actions.setFilter(active.current.dataset.filter as string))
    active.current.className = styles.active__btn
  }

  const active = useRef<HTMLButtonElement>()

  return (
    <div className={styles.footer}>
      <div className={styles.taskCounter}>
        {`${activeCounter} tasks left`}
      </div>
      <div className={styles.filters}>
        <button data-filter="All" onClick={changeFilter}>All</button>
        <button data-filter="Active" onClick={changeFilter}>Active</button>
        <button data-filter="Finished" onClick={changeFilter}>Finished</button>
      </div>
      <button className={isAnyFinished ? '' : styles.hidden} onClick={clearSelected}>Clear completed</button>
    </div>
  )
}
export default Filters