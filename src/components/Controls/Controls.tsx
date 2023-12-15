import type { FC, KeyboardEvent } from 'react'
import type { ThunkDispatch } from 'redux-thunk'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IState } from '../../interfaces'
import actions from '../../store/actions/actions'
import styles from './Controls.module.css'

const Controls:FC = () => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, any>>()
  const [value, setValue] = useState('')
  
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(actions.addNewItem(value))
    setValue('')
  }
  const selectAllHandler = () => dispatch(actions.processSelectAll())
  
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