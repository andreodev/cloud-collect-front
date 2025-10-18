import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '@/service/api.service';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
    enterprise?: {
        id: string;
        nome: string;
        cnpj: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Tipo da resposta do backend
interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    token: string;
    expiresIn: number;
  };
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.post<LoginResponse>('/auth/login', credentials);
      
      // Extrai o token do data
      const token = response.data.token;
      
      // Armazena o token no cookie
      Cookies.set('auth_token', token, { 
        expires: 7, // 7 dias
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Define o token no apiService para as próximas requisições
      apiService.setToken(token);
      
      return { token };
    } catch (error) {
      console.error('Erro no login:', error);
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || 
        err.message || 
        'Erro ao fazer login. Verifique sua conexão com o servidor.'
      );
    }
  }
);

// Tipo da resposta do /user/me
interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<UserResponse>('/user/me');
      // Extrai os dados do usuário do data
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      const err = error as { response?: { data?: { message?: string } } };
      // Remove o token se não for válido
      Cookies.remove('auth_token');
      apiService.clearToken();
      
      return rejectWithValue(
        err.response?.data?.message || 'Token inválido ou expirado'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      Cookies.remove('auth_token');
      apiService.clearToken();
      
      return null;
    } catch (error) {
      const err = error as { message?: string };
      return rejectWithValue(err.message || 'Erro ao fazer logout');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        // O usuário será carregado pelo fetchCurrentUser
        state.user = null;
        state.isAuthenticated = false; // Ainda não está totalmente autenticado
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Fetch current user (/me)
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Mesmo com erro, faz logout local
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
