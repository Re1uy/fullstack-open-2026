import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    dispatch({
      type: 'create',
      content,
    })
    dispatch(setNotification(`you create ${content}`))
    setTimeout(()=> dispatch(clearNotification()), 50)
  }

  return(
    <div>
      <h2>create new</h2>
        <form onSubmit={create}>
        <div>
          <input name='anecdoteText'/>
        </div>
        <button type='submit' >create</button>
      </form>
    </div>
    
  )
}
export default AnecdoteForm