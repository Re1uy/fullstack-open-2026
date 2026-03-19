import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }
  })

  const sortanecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      {sortanecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
