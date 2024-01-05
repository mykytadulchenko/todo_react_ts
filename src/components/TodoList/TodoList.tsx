import { Container, Table, TableBody, TableFooter, TableHead, styled } from '@mui/material'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IUser } from '../../interfaces'
import actions from '../../store/actions/itemActions'
import { filterSelector, getDataSelector, getUserSelector } from '../../store/selectors'
import Controls from '../Controls/Controls'
import Filters from '../Filters/Filters'
import Screen from '../Screen/Screen'

const LayoutContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0',
    minWidth: '320px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '100%',
    borderRadius: '16px',
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 20px 10px rgba(84, 84, 84, 0.1)',
    overflow: 'hidden'
  }
})

const StyledTable = styled(Table)({
  '&.MuiTable-root': {
    marginBottom: '-10px',
    width: '100%',
    borderCollapse: 'separate', 
    borderSpacing: '10px'
  }
})

const TodoList:FC = () => {
  const data = useSelector(getDataSelector)
  const filter = useSelector(filterSelector)
  const user = useSelector(getUserSelector) as IUser
  const dispatch = useDispatch<ThunkDispatch<IAction, any, any>>()

  useEffect(() => {
    dispatch(actions.fetchData(user.id as string))
  }, [])

  const activeCounter = data.reduce((acc, el) => el.completed ? acc : ++acc, 0)

  const filteredData = useMemo(() => {
    switch(filter) {
    case 'Active': return data.filter(el => !el.completed)
    case 'Finished': return data.filter(el => el.completed)
    default: return data
  }
  }, [filter, data])

  return (
    <LayoutContainer>
      <StyledTable stickyHeader>
        <TableHead>
          <Controls/>
        </TableHead>
        <TableBody>
        {data.length > 0 
        ?
        <Screen data={filteredData}/>
        : null}
        </TableBody>
        <TableFooter>
          {data.length > 0
          ?
          <Filters activeCounter={activeCounter} isAnyFinished={data.length !== activeCounter}/>
          :
          null
          }
        </TableFooter>
      </StyledTable>
    </LayoutContainer>
  )
}

export default TodoList