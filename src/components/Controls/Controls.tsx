import { Button, Container, TextField, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IState, IUser } from '../../interfaces'
import asyncItemActions from '../../store/actions/itemActions'
import { userActions } from '../../store/actions/userActions'
import { getUserSelector } from '../../store/selectors'

const OuterContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '0'
  }
})

const ProfileContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: '5px',
    borderRadius: '8px',
    backgroundColor: 'rgba(250, 250, 250, 0.3)',
    color: '#6988bf',
    '& h1': {
      fontSize: '1.4em',
      flexGrow: '1'
    },
    '& button': {
      border: 'none',
      borderRadius: '6px',
      padding: '5px 10px',
      color: '#fafafa',
      fontFamily: 'inherit',
      backgroundColor: '#789cdb',
    },
    '& p': {
      width: '100%'
    }
  }
})

const ControlsContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    gap: '5px',
    padding: 0,
    '& button': {
      minWidth: '0',
      padding: '0 10px',
      border: 'none',
      background: 'none',
      fontSize: 'inherit',
      color: '#6988bf',
      cursor: 'pointer'
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
  const dispatch = useDispatch<ThunkDispatch<IState, any, any>>()
  const user = useSelector(getUserSelector) as IUser
  const [value, setValue] = useState('')
  const date = new Date()

  const logOutHandler = () => {
    dispatch(userActions.logOut())
  }
  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(asyncItemActions.addNewItem(user.id as string, value))
    setValue('')
  }
  const selectAllHandler = () => {
    dispatch(asyncItemActions.processSelectAll(user.id as string))
  }
  const dateStringCreator = () => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
  }

  const responsiveGreeting = (date: Date) => {
    const hours = date.getHours()
    if(hours >= 4 && hours < 12) return 'Good morning'
    else if(hours >= 12 && hours < 16) return 'Good day'
    else if(hours >= 16 && hours < 24) return 'Good evening'
    else if(hours <= 0  && hours < 4) return 'Good night'
  }

  return (
    <OuterContainer>
      <ProfileContainer>
        <h1>{responsiveGreeting(date)}, {user.login}!</h1>
        <Button onClick={logOutHandler}>Log out</Button>
        <p>Today is {dateStringCreator()}</p>
      </ProfileContainer>
      <ControlsContainer>
        <Button onClick={selectAllHandler}>
          <i className="fa-solid fa-check-double"></i>
        </Button>
        <InputTask type="text" size="small" placeholder='Input task...' value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={addItem}/>
      </ControlsContainer>
    </OuterContainer>
  )
}
export default Controls