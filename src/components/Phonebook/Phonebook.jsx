import { useState, useCallback, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Section from '../../shared/Section';
import operations from '../redux/contacts/contacts-operations';
import { getAllContacts, getContactsLoading } from '../redux/contacts/contacts-selectors';

const Phonebook = () => {
    
    const contacts = useSelector(getAllContacts, shallowEqual);
    const loading = useSelector(getContactsLoading, shallowEqual);
console.log(contacts)
    const dispatch = useDispatch();

    useEffect(() => {
      const getContacts = () => dispatch(operations.fetchContacts());
      getContacts();
    }, [dispatch]);

  const [filter, setFilter] = useState('');  
  
    const addContact = useCallback( payload => {        
    const {name} = payload;
    if (
      !contacts.find(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {        
            const action = operations.addContact(payload);
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
    dispatch(operations.removeContact(id));
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
          {loading && <p>...Loading</p>}
          <ContactList
            contacts={getFilteredContacts()}
            removeContact={removeContact}
          />
        </Section>
      </div>
    );  
}

export default Phonebook;
