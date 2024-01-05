import { Button, Container, TableCell, TableRow, styled } from '@mui/material'
import type { FC, MouseEvent } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IState, IUser } from '../../interfaces'
import type { IFiltersComponent } from '../../interfaces/components'
import asyncItemActions, { itemActions } from '../../store/actions/itemActions'
import { getUserSelector } from '../../store/selectors'

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    padding: '5px',
    minWidth: '110px',
    height: '42px',
    whiteSpace: 'nowrap',
    border: 'none',
    textAlign: 'center',
    verticalAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '0.9em',
    '&:nth-of-type(1)': {
      textAlign: 'left'
    },
    '&:nth-of-type(2)': {
      width: '100%',
    },
    '&:nth-of-type(3)': {
      textAlign: 'right'
    },
    '& p': {
      color: '#fafafa',
    },
    '& > button': {
      textDecoration: 'underline',
      '&.hidden': {
        transform: 'translateY(200%)'
      }
    },
    '& button': {
      padding: '0',
      minWidth: '0',
      border: 'none',
      background: 'none',
      fontFamily: 'inherit',
      fontSize: '1em',
      color: '#fafafa',
      textTransform: 'none',
      '&.active__btn': {
        padding: '2px',
        border: '1px solid #fafafa',
        borderRadius: '4px',
      },
      '&:hover': {
        background: 'none'
      }
    }
  }
})

const FiltersContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
})

const Filters: FC<IFiltersComponent> = ({activeCounter, isAnyFinished}) => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const user = useSelector(getUserSelector) as IUser
  const clearSelected = () => dispatch(asyncItemActions.processRemoveSelected(user.id as string))
  const changeFilter = (e: MouseEvent) => {
    if(active.current) active.current.classList.remove('active__btn')
    active.current = e.target as HTMLButtonElement
    dispatch(itemActions.setFilter(active.current.dataset.filter as string))
    active.current.classList.add('active__btn')
  }

  useEffect(() => {
    active.current!.classList.add('active__btn')
    if(!isAnyFinished) clearSelectedBtn.current!.classList.add('hidden')
    else clearSelectedBtn.current!.classList.remove('hidden')
  }, [isAnyFinished])

  const active = useRef<HTMLButtonElement | null>(null)
  const clearSelectedBtn = useRef<HTMLButtonElement | null>(null)

  return (
    <TableRow>
      <StyledTableCell colSpan={2}>
        <p>{`${activeCounter} tasks left`}</p>
      </StyledTableCell>
      <StyledTableCell>
        <FiltersContainer>
          <Button ref={active} data-filter="All" onClick={changeFilter}>All</Button>
          <Button data-filter="Active" onClick={changeFilter}>Active</Button>
          <Button data-filter="Finished" onClick={changeFilter}>Finished</Button>
        </FiltersContainer>
      </StyledTableCell>
      <StyledTableCell colSpan={3}>
        <Button ref={clearSelectedBtn} onClick={clearSelected}>Clear completed</Button>
      </StyledTableCell>
    </TableRow>
  )
}
export default Filters