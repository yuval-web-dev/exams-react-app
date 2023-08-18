import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: 'John',
  surname: 'Doe',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.firstname = action.payload.firstname;
      state.surname = action.payload.surname;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
