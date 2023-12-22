import type { FC, KeyboardEvent } from 'react'
import type { ThunkDispatch } from 'redux-thunk'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { IState, IUser } from '../../interfaces'
import styles from './Controls.module.css'
import { getUserSelector } from '../../store/selectors'
import asyncItemActions from '../../store/actions/itemActions'

const Controls:FC = () => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, any>>()
  const user = useSelector(getUserSelector) as IUser
  const [value, setValue] = useState('')
  
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(asyncItemActions.addNewItem(user.id as string, value))
    setValue('')
  }
  const selectAllHandler = () => dispatch(asyncItemActions.processSelectAll(user.id as string))
  
  return (
    <div className={styles.controls}>
      <button onClick={selectAllHandler}>
        <i className="fa-solid fa-check-double"></i>
      </button>
      <input type="text" placeholder='Input task...' value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={addItem}/>
    </div>
  )
}
export default Controls