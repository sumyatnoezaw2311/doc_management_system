import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";


const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getHolidays = createAsyncThunk(
    "holidays/getHolidays",
    async ({pageNo})=>{
      try {
          let urlParam = "";
          if(pageNo){
            urlParam = `?page=${pageNo}`
          }
          const config = {
              method: 'get',
              url: `${BASE_URL}/holidays${urlParam}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const createHoliday = createAsyncThunk(
    "holidays/create",
    async (data)=>{
      try{
        const response = await axios.post(`${BASE_URL}/holidays/create`,
        data,
        {
          headers: HEADERS()
        })
        AppSnackbar('success', 'Successfully Created')
        return response.data
      }catch(error){
        if(error.code === "ERR_BAD_REQUEST" && error.response.data?.errors?.date[0]){
          AppSnackbar('error', 'Failed, this date has already been taken')
        }else{
          AppSnackbar('error', 'Failed, something went wrong')
        }
        throw new Error(error)
      }
    }
  )

export const deleteHoliday = createAsyncThunk(
  "holidays/delete",
  async (id)=>{
    try{
      const response = await axios.delete(`${BASE_URL}/holidays/delete/${id}`,{
        headers: HEADERS()
      })
      AppSnackbar('success', 'Successfully Deleted')
      return response.data
    }catch(error){
      AppSnackbar('error', 'Failed, something went wrong')
      throw new Error(error)
    }
  }
)


const holidaySlice = createSlice({
  name: "holiday",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export default holidaySlice.reducer;
