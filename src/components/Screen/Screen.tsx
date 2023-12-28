import type { FC } from 'react'
import type { IScreenComponent } from '../../interfaces/components'
import ListItem from '../ListItem/ListItem'
import styles from './Screen.module.css'
import { List, styled } from '@mui/material'

const ItemList = styled(List)({
  '&.MuiList-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px 0',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'scroll',
  }
})

const Screen:FC<IScreenComponent> = ({data}) => {
  return (
    <ItemList>
      {data.map(item => 
        <ListItem key={item.id} itemData={item}/>
      )}
    </ItemList>
  )
}
export default Screen