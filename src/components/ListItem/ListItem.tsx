import { Button, Checkbox, Container, ListItem as MUIListItem, TextField, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from "react"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from 'redux-thunk'
import type { IListItem, IState } from "../../interfaces"
import type { IListItemComponent } from "../../interfaces/components"
import asyncItemActions from '../../store/actions/itemActions'

const StyledListItem = styled(MUIListItem)({
  '&.MuiListItem-root': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '5px',
    gap: '5px',
    padding: '0 10px',
    width: 'auto',
    minHeight: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px 2px rgba(91, 91, 91, 0.1)',
    '& p': {
      flexGrow: '1',
      color: '#fafafa',
      userSelect: 'none'
    },
    '& p.finished': {
      textDecoration: 'line-through'
    },
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0',
      height: '13px',
      width: '13px',
      minWidth: '13px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: '0',
      transition: 'opacity 0.3s',
      '& i': {
        color: '#ad0000'
      }
    },
    '&:hover button': {
      opacity: '1'
    }
  },
})

const StyledCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    padding: '0',
    maxWidth: '18px',
    maxHeight: '18px',
    '& .MuiSvgIcon-root': {
      fill: '#6988bf',
      width: '100%',
      height: '100%'
    }
  }
})

const EditContainer = styled(Container)({
  '&.MuiContainer-root': {
    padding: '0',
  }
})

const StyledInput = styled(TextField)({
  '&': {
    width: '100%'
  },
  '& .MuiInputBase-root': {
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    '& input': {
      padding: '2px 10px',
      color: '#fafafa'
    }
  },
  '.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#6988bf', 
    },
  }
})

const ListItem:FC<IListItemComponent> = ({ itemData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(itemData.value)
  const dispatch = useDispatch<ThunkDispatch<IState, any, any>>()

  const checkItem = (item: IListItem) => dispatch(asyncItemActions.editItem({...item, completed: !item.completed}))
  const removeItem = (item: IListItem) => dispatch(asyncItemActions.removeItem(item))
  const edit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return
    dispatch(asyncItemActions.editItem({...itemData, value}))
    setIsEditing(false)
  }

  return (
    <StyledListItem>
      {isEditing ? (
        <EditContainer>
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onKeyUp={edit}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </EditContainer>
      ) : (
        <>
          <StyledCheckbox checked={itemData.completed} onChange={() => checkItem(itemData)}/>
          <p className={itemData.completed ? 'finished' : ''} onDoubleClick={() => setIsEditing(true)}>{itemData.value}</p>
          <Button onClick={() => removeItem(itemData)}>
            <i className="fa-solid fa-xmark fa-lg"></i>
          </Button>
        </>
      )}
    </StyledListItem>
  )
}
export default ListItem
