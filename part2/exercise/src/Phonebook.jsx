import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

const AfterFliter = ({ persons, filter, onDelete }) => {
  const newpersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return <Persons persons={newpersons} onDelete={onDelete} />;
};

const Filter = ({ value, onChange }) => (
  <p>
    filter shown with: <input value={value} onChange={onChange} />
  </p>
);

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <h2>add a new</h2>
      <p>
        name: <input value={newName} onChange={handleNameChange} />
      </p>
      <p>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Notification = ({ info }) => {
  if (info.message == null) {
    return null;
  }

  return <div className={info.type}>{info.message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [newFilter, setnewFilter] = useState("");
  const [info, setinfo] = useState({ message: null, type: "null" });

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleFliterChange = (event) => {
    console.log(event.target.value);
    setnewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setnewPhone(event.target.value);
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleReplace = (name, number) => {
    if (
      window.confirm(
        `${name} is already added to phonebook, replace the old number with new one ?`,
      )
    ) {
      const { id } = persons.find((person) => person.name === name);
      const newinfo = { name, number };
      personService
        .update(id, newinfo)
        .then((returnperson) => {
          setPersons(
            persons.map((p) => (p.id !== returnperson.id ? p : returnperson)),
          );
          notify(`Added ${newName}`, "success");
          setnewPhone("");
          setNewName("");
        })
        .catch(() => {
          console.log('fail')
          notify(
            `Information of ${name} has already been removed from server`,
            "error",
          );
        });;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhone };
    if (existName(newName)) {
      handleReplace(newName, newPhone);
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        notify(`Added ${newName}`, "success");
        setnewPhone("");
        setNewName("");
      })
        .catch(error => {
          notify(error.response.data.error, "error")
      });
    }
  };

  const notify = (message, type) => {
    setinfo({ message, type });
    setTimeout(() => {
      setinfo({ message : null, type });
    }, 5000);
  };

  const existName = (checkname) => {
    return persons.some((person) => person.name === checkname);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={info} />
      <Filter value={newFilter} onChange={handleFliterChange} />
      <PersonForm
        onSubmit={submit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <AfterFliter
        persons={persons}
        filter={newFilter}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
