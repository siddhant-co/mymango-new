import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | number;
}

interface ForgotPasswordState {
  email: string;
  otpSent: boolean;
  otpVerified: boolean;
  resetSuccess: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthState {
  token: string | null;
  customer: Customer | null;
  forgotPassword: ForgotPasswordState;
}

const initialForgotPasswordState: ForgotPasswordState = {
  email: '',
  otpSent: false,
  otpVerified: false,
  resetSuccess: false,
  loading: false,
  error: null,
};

const initialState: AuthState = {
  token: null,
  customer: null,
  forgotPassword: initialForgotPasswordState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; customer: Customer }>
    ) => {
      state.token = action.payload.token;
      state.customer = action.payload.customer;
    },
    logout: (state) => {
      state.token = null;
      state.customer = null;
      state.forgotPassword = initialForgotPasswordState;
    },
    startForgotPasswordLoading: (state) => {
      state.forgotPassword.loading = true;
      state.forgotPassword.error = null;
    },
    setForgotPasswordEmail: (state, action: PayloadAction<string>) => {
      state.forgotPassword.email = action.payload;
    },
    sendOtpSuccess: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.otpSent = true;
      state.forgotPassword.error = null;
    },
    sendOtpFailure: (state, action: PayloadAction<string>) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.error = action.payload;
    },
    verifyOtpSuccess: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.otpVerified = true;
      state.forgotPassword.error = null;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.error = action.payload;
    },
    resetPasswordSuccess: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.resetSuccess = true;
      state.forgotPassword.error = null;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.error = action.payload;
    },
    resetForgotPasswordState: (state) => {
      state.forgotPassword = initialForgotPasswordState;
    },
  },
});

export const {
  setAuthData,
  logout,
  startForgotPasswordLoading,
  setForgotPasswordEmail,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetForgotPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
