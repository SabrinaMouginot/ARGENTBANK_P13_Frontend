import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  loading: false,
  error: null,
};

// Thunk pour récupérer les données du profil utilisateur
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (token) => {
  const response = await axios.get('http://localhost:3001/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.body;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;