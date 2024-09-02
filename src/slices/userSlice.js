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
  },
});

export default userSlice.reducer;