import { createAsyncThunk } from '@reduxjs/toolkit';
import contactsApi from '../../../shared/api/contactMockAPI';

export const fetchContacts = createAsyncThunk(
  'contacts / fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await contactsApi.getContacts();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts / addContact',
  async (data, { rejectWithValue }) => {
    try {
      const result = await contactsApi.addContact(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      const { name, number } = data;
      const nameCompare = name.toLowerCase();
      const numberCompare = number.toLowerCase();
      const result = contacts.items.find(({ name, number }) => {
        return (
          name.toLowerCase() === nameCompare &&
          number.toLowerCase() === numberCompare
        );
      });
      if (result) {
        alert(`This ${name} is already in contacts!`);
        return false;
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts / removeContact',
  async (id, { rejectWithValue }) => {
    try {
      const result = await contactsApi.removeContact(id);
      return result.id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const operations = {
  fetchContacts,
  addContact,
  removeContact,
};

export default operations;