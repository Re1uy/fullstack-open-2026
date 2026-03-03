const Persons = ({persons}) => {
    return <div>{persons.map(person => <p key = {person.id}>{person.name}{' '}{person.number}</p>)}</div>
}

const AfterFliter = ({persons, filter}) => {
    const newpersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return <Persons persons={newpersons}/>
}

const Filter = ({ value, onChange }) => (
  <p>
    filter shown with: <input value={value} onChange={onChange} />
  </p>
)

const PersonForm = ({ onSubmit, newName, handleNameChange, newPhone, handlePhoneChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      <h2>add a new</h2>
      <p>name: <input value={newName} onChange={handleNameChange}/></p>
      <p>number: <input value={newPhone} onChange={handlePhoneChange}/></p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setnewPhone] = useState('')
  const [newFilter, setnewFilter] = useState('')

const handleFliterChange = (event) => {
    console.log(event.target.value)
    setnewFilter(event.target.value)
  }

const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setnewPhone(event.target.value)
  }

const submit = (event) => {
    event.preventDefault()
    if (existName(newName)) {
        alert(newName + ' is already added to phonebook');
    } else {
        setPersons([...persons,{name: newName,number:newPhone, id:persons.length + 1}])
        setnewPhone('')
        setNewName('')
    }
}

const existName = (checkname) => {
    return persons.some(person => person.name === checkname )
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFliterChange}/>
        <PersonForm 
            onSubmit={submit}
            newName={newName}
            handleNameChange={handleNameChange}
            newPhone={newPhone}
            handlePhoneChange={handlePhoneChange}
            />

            <h2>Numbers</h2>
      <AfterFliter persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App