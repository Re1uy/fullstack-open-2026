import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {


  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const sortanecdotes = [...anecdotes].sort((a,b) => (b.votes - a.votes))

  const vote = id => {
    dispatch({
      type: 'vote',
      id    
    })
  }

  return (
    <div>
      {sortanecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList