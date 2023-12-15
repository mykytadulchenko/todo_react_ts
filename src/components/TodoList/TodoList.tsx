import type { FC } from 'react'
import type { IAction } from '../../interfaces'
import type { ThunkDispatch } from 'redux-thunk'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'
import { filterSelector, getDataSelector } from '../../store/selectors'
import Controls from '../Controls/Controls'
import Filters from '../Filters/Filters'
import Screen from '../Screen/Screen'
import styles from './TodoList.module.css'

const TodoList:FC = () => {
  const data = useSelector(getDataSelector)
  const filter = useSelector(filterSelector)
  const dispatch = useDispatch<ThunkDispatch<IAction, any, any>>()

  useEffect(() => {
    dispatch(actions.fetchData())
  }, [])

  const activeCounter = data.reduce((acc, el) => el.isFinished ? acc : ++acc, 0)

  const filteredData = useMemo(() => {
    switch(filter) {
    case 'Active': return data.filter(el => !el.isFinished)
    case 'Finished': return data.filter(el => el.isFinished)
    default: return data
  }
  }, [filter, data])

  return (
    <div className={styles.list}>
        <Controls/>
        <Screen data={filteredData}/>
        {data.length > 0 ?
        <Filters activeCounter={activeCounter} isAnyFinished={data.length !== activeCounter}/>
        : null}
    </div>
  )
}

export default TodoList