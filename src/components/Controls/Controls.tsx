import { Button, Container, TableCell, TableRow, TextField, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IState, IUser } from '../../interfaces'
import asyncItemActions from '../../store/actions/itemActions'
import { getUserSelector } from '../../store/selectors'

const StyledTableRow = styled(TableRow)({
  '&.MuiTableRow-root': {
    '& button': {
      minWidth: '40px',
      padding: '0',
      border: 'none',
      background: 'none',
      fontSize: 'inherit',
      color: '#6988bf',
      cursor: 'pointer',
    }
  }
})

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    padding: '0',
    paddingBottom: '10px',
    border: '0',
    textAlign: 'center',
    backgroundColor: 'transparent',
    '&:nth-of-type(1)': {
      maxWidth: '40px',
      width: '40px'
    }
  }
})

const InputTask = styled(TextField)({
  '&': {
    width: '100%',
  },
  '& .MuiInputBase-root': {
    borderRadius:' 8px',
    overflow: 'hidden',
    '& input': {
      padding: '10px',
      fontFamily: 'Montserrat',
      backgroundColor: 'rgba(220, 220, 220, 0.5)',
      transition: 'background-color 0.6s'
    },
    '& input:focus': {
      backgroundColor: '#fafafa'
    }
  },
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6988bf',
    },
    '&:hover fieldset': {
      borderColor: '#6988bf',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6988bf', 
    },
  }
})

const Controls:FC = () => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const user = useSelector(getUserSelector) as IUser
  const [value, setValue] = useState('')
  
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(asyncItemActions.addNewItem(user.id as string, value))
    setValue('')
  }
  const selectAllHandler = () => {
    dispatch(asyncItemActions.processSelectAll(user.id as string))
  }

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Button onClick={selectAllHandler}>
          <i className="fa-solid fa-check-double fa-lg"></i>
        </Button>
      </StyledTableCell>
      <StyledTableCell colSpan={5}>
        <InputTask type="text" size="small" placeholder='Input task...' value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={addItem}/>
      </StyledTableCell>
    </StyledTableRow>
  )
}
export default Controls