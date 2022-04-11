import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    add: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: data => {
        const newContact = {
          ...data,
          id: nanoid(),
        };
        return {
          payload: newContact,
        };
      },
    },
    remove: (state, { payload }) => {
      const newState = state.filter(({ id }) => id !== payload);
      return newState;
    }
  },
});

export const { actions } = contactsSlice;

export default contactsSlice.reducer;
