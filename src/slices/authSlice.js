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
    return response.data; // si email et passeword ok, je retourne les données du serveur (token)
  } catch (e) {
    return rejectWithValue(e.response.data.message) // si email et password pas ok, je retourne le msg d'erreur du serveur
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
      // si login en cours, je modifie mon état.
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // si login ok, je modifie mon état.
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.body.token;
        state.loading = false;
      })
      // si login pas ok, je modifie mon état
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
