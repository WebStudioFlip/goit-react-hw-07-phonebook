import { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Section from '../../shared/Section';
import { actions } from '../redux/contacts/contacts-slice';
import { getAllContacts } from '../redux/contacts/contacts-selectors';

const Phonebook = () => {
    
    const contacts = useSelector(getAllContacts, shallowEqual);
    const dispatch = useDispatch();
console.log(contacts)
  const [filter, setFilter] = useState('');  
  
    const addContact = useCallback( payload => {        
    const {name} = payload;
    if (
      !contacts.find(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {        
            const action = actions.add(payload);
            dispatch(action);         
    } else {
      alert(`${name} is already in contacts`);
    }
  },[contacts, dispatch]);

  const getFilteredContacts =() => {    
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(({name}) => name.toLowerCase().includes(filterStr));
    return result;
  };

  const handleSearch = useCallback( ({target}) => {
    const { value } = target;
    setFilter(value);
  }, []);

  const removeContact = id => {
    dispatch(actions.remove(id))
  };

  
    return (
      <div
        style={{
          //height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          textTransform: 'uppercase',
          color: '#010101',
          padding: '20px',
        }}
      >
        <Section title="Phonebook">
          <ContactForm addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filterContacts={handleSearch}
            filter={filter}
          />
          <ContactList
            contacts={getFilteredContacts()}
            removeContact={removeContact}
          />
        </Section>
      </div>
    );  
}

export default Phonebook;
