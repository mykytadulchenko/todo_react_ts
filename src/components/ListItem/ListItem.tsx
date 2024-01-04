import { Button, Checkbox, Container, ListItem as MUIListItem, TableCell, TableRow, TextField, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from "react"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IListItem, IState } from "../../interfaces"
import type { IListItemComponent } from "../../interfaces/components"
import asyncItemActions from '../../store/actions/itemActions'

const StyledTableRow = styled(TableRow)({
  '&.MuiTableRow-root': {
    borderRadius: '8px',
    boxShadow: '0 2px 5px 2px rgba(91, 91, 91, 0.1)',
    fontFamily: 'Montserrat',
  }
})

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    padding: '10px 15px',
    border: 'none',
    '&:nth-of-type(3)': {
      width: '30px',
    },
    '& p': {
      fontSize: '1.2em',
      fontFamily: 'Montserrat',
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
  }
})

const StyledCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    padding: '0',
    minWidth: '18px',
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
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()

  const checkItem = (item: IListItem) => dispatch(asyncItemActions.editItem({...item, completed: !item.completed}))
  const removeItem = (item: IListItem) => dispatch(asyncItemActions.removeItem(item))
  const edit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return
    dispatch(asyncItemActions.editItem({...itemData, value}))
    setIsEditing(false)
  }

  return (
   <StyledTableRow>
      {isEditing ? (
        <TableCell>
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onKeyUp={edit}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </TableCell>
      ) : (
        <>
          <StyledTableCell>
            <StyledCheckbox checked={itemData.completed} onChange={() => checkItem(itemData)}/>
          </StyledTableCell>
          <StyledTableCell colSpan={4}>
            <p className={itemData.completed ? 'finished' : ''} onDoubleClick={() => setIsEditing(true)}>{itemData.value}</p>
          </StyledTableCell>
          <StyledTableCell>
            <Button onClick={() => removeItem(itemData)}>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </Button>
          </StyledTableCell>
        </>
      )}
    </StyledTableRow>
  )
}
export default ListItem
