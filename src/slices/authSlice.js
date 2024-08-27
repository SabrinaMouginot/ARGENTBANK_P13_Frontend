import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

// Thunk pour faire l'appel API de connexion
export const login = createAsyncThunk('auth/login', async (credentials, {rejectWithValue}) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
    console.log (response)
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message)
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
