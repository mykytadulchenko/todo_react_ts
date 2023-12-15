import type { FC, MouseEvent } from 'react'
import type { IFiltersComponent } from '../../interfaces/components'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction } from '../../interfaces'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './Filters.module.css'
import actions from '../../store/actions/actions'

const Filters: FC<IFiltersComponent> = ({activeCounter, isAnyFinished}) => {
  const dispatch = useDispatch<ThunkDispatch<IAction, any, any>>()
  const clearSelected = () => dispatch(actions.processRemoveSelected())
  const changeFilter = (e: MouseEvent) => {
    if(active.current) active.current.className = ''
    active.current = e.target as HTMLButtonElement
    dispatch(actions.setFilter(active.current.dataset.filter as string))
    active.current.className = styles.active__btn
  }

  useEffect(() => {
    active.current.className = styles.active__btn
  }, [])

  const active = useRef<any>()

  return (
    <div className={styles.footer}>
      <div className={styles.taskCounter}>
        {`${activeCounter} tasks left`}
      </div>
      <div className={styles.filters}>
        <button ref={active} data-filter="All" onClick={changeFilter}>All</button>
        <button data-filter="Active" onClick={changeFilter}>Active</button>
        <button data-filter="Finished" onClick={changeFilter}>Finished</button>
      </div>
      <button className={isAnyFinished ? '' : styles.hidden} onClick={clearSelected}>Clear completed</button>
    </div>
  )
}
export default Filters