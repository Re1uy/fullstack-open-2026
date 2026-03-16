import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if(state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter( a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

  const sortanecdotes = [...anecdotes].sort((a,b) => (b.votes - a.votes))

  const vote = (id, content) => {
    dispatch({
      type: 'vote',
      id    
    })
    dispatch(setNotification(`you voted ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
  }

  return (
    <div>
      {sortanecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList