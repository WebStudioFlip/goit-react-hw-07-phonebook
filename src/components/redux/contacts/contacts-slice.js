import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  removeContact,
} from './contacts-operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,  
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.items = [...payload];
      state.loading = false;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [addContact.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.items.push(payload);
      state.loading = false;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [removeContact.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [removeContact.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter(({id}) => id !== payload);
      state.loading = false;
    },
    [removeContact.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { actions } = contactsSlice;

export default contactsSlice.reducer;
