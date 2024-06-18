import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './service/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [newMessage, setNewMessage] = useState({message: null, type: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const isNameInPhonebook = (name) => {
    return persons.find(person => person.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = isNameInPhonebook(newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewMessage({message: `Changed ${newName}'s number to ${newNumber}`, type: 'success'})
            setTimeout(() => {
              setNewMessage({ message: null, type: '' })
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage({message: `Added ${newName}`, type: 'success'})
        setTimeout(() => {
          setNewMessage({message: null, type: ''})
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNewMessage({message: `Deleted ${name}`, type: 'success'})
          setTimeout(() => {
            setNewMessage({message: null, type: ''})
          }, 5000)
        })
        .catch(error => {
          setNewMessage({message: `Information of ${name} has already been removed from the server`, type: 'error'})
          setTimeout(() => {
            setNewMessage({message: null, type: ''})
          }, 5000)
        })
        setPersons(persons.filter(n => n.id !== id))
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage.message} type={newMessage.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App