import { FC } from 'react'
import ListItem from '../ListItem/ListItem'
import styles from './Screen.module.css'
import { IScreenComponent } from '../../interfaces/components'

const Screen:FC<IScreenComponent> = ({data}) => {
  return (
    <ul className={styles.screen}>
      {data.map(item => 
        <ListItem key={item.id} itemData={item}/>
      )}
    </ul>
  )
}
export default Screen