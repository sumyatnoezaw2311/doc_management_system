import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { HEADERS } from "../../utils/config";

const initialState = {
    photo: null,
    qr_photo: null,
    loading: null,
    error: null,
}

export const getPhoto = createAsyncThunk(
    "image/getPhoto",
    async (url)=>{
      try {
          const config = {
              method: 'get',
              url: url,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const getQrPhoto = createAsyncThunk(
    "image/getQrPhoto",
    async (url)=>{
      try {
          const config = {
              method: 'get',
              url: url,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )



  const getImgSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPhoto.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getPhoto.fulfilled, (state, action) => {
          state.loading = false;
          state.photo = action.payload;
        })
        .addCase(getPhoto.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(getQrPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getQrPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.qr_photo = action.payload;
        })
        .addCase(getQrPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
  });
  
  
  export default getImgSlice.reducer;
  