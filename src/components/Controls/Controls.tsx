import { FC, KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../store/actions/actions'
import styles from './Controls.module.css'

const Controls:FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] =useState('')
  
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(actions.addItem(value))
    setValue('')
  }
  const selectAllHandler = () => dispatch(actions.selectAll())
  
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