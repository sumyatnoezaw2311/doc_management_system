import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS,setInfoToLocal } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  user: null,
  cvStatus: null,
  loading: false,
  error: null,
  verifyToken: null,
  profile: null
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginData) => {
        try {
            const config = {
                method: 'post',
                url: `${BASE_URL}/users/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: loginData
            };
            const response = await axios(config);
            AppSnackbar('success', 'Successfully Login')
            return response.data;
        } catch (error) {
            if(error.response.status === 401){
              AppSnackbar('error','Missing email or password')
            }else{
              AppSnackbar('error','Something went wrong')
            }
            throw new Error(error);
        }
    }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async ()=>{
    try {
        const config = {
            method: 'get',
            url: `${BASE_URL}/users/user-profile`,
            headers: HEADERS(),
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
  }
)

export const getCvStatus = createAsyncThunk(
  "auth/getCvStatus",
  async (userId)=>{
    try {
        const config = {
            method: 'get',
            url: `${BASE_URL}/users/cv-status/${userId}`,
            headers: HEADERS(),
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, userData);
      AppSnackbar('success', 'Successfully Registered')
      return response.data;
    } catch (error) {
      if(error.code === 'ERR_BAD_REQUEST'){
        AppSnackbar('error', `Failed, email has already been used`)
      }else{
        AppSnackbar('error', 'Failed, something went wrong')
      }
      throw new Error(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async ()=>{
    try {
        const config = {
            method: 'get',
            url: `${BASE_URL}/users/refresh`,
            headers: HEADERS(),
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/forgot-password`, email);
      AppSnackbar('success', 'Email has been sent to your email,please check its out')
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state)=>{
      state.loading = false;
      state.data = [];
      state.error = null
      AppSnackbar('success', "Successfully Logout")
      localStorage.removeItem('cmauth2023')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setInfoToLocal({
            token: action.payload.data.token,
            timeStamp: Math.floor(Date.now()/1000)
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProfile.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state,action)=>{
        state.loading = false;
        state.profile = action.payload
      })
      .addCase(getProfile.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCvStatus.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getCvStatus.fulfilled, (state,action)=>{
        state.loading = false;
        state.cvStatus = action.payload
      })
      .addCase(getCvStatus.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setInfoToLocal({
            token: action.payload.data.token,
            timeStamp: Math.floor(Date.now()/1000)
        })
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyToken = action.payload;;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  logOut
} = authSlice.actions

export default authSlice.reducer;
