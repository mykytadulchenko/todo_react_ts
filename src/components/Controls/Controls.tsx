import { useDispatch } from 'react-redux'
import styles from './Controls.module.css'
import { KeyboardEvent } from 'react'
import actions from '../../store/actions/actions'

const Controls = () => {
  const dispatch = useDispatch()
  
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(actions.addItem((e.target as HTMLInputElement).value));
    (e.target as HTMLInputElement).value = ''
  }
  const selectAllHandler = () => dispatch(actions.selectAll())
  
  return (
    <div className={styles.controls}>
      <button onClick={selectAllHandler}>
        <i className="fa-solid fa-check-double"></i>
      </button>
      <input type="text" placeholder='Input task...' onKeyUp={addItem}/>
    </div>
  )
}
export default Controls