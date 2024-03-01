import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  incharges: [],
  coms: null,
  com: null,
  data: null,
  loading: false,
  error: null,
};

export const getAllCompanies = createAsyncThunk(
    "company/getAllCom",
    async ()=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/companies`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const getCompanyById = createAsyncThunk(
    "company/getComById",
    async (id)=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/companies/${id}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )


export const createCompany = createAsyncThunk(
  "company/create",
  async (comData)=>{
    try{
      const response = await axios.post(`${BASE_URL}/companies/create`, comData,{
        headers: HEADERS()
      })
      AppSnackbar('success', 'Successfully Created')
      return response.data
    }catch(error){
      AppSnackbar('error', 'Failed, something went wrong')
      throw new Error(error)
    }
  }
)

export const updateCompany = createAsyncThunk(
  "company/update",
  async ({comData,id})=>{
    try{
      const response = await axios.post(`${BASE_URL}/companies/update/${id}`, comData,{
        headers: HEADERS()
      })
      AppSnackbar('success', 'Successfully Updated')
      return response.data
    }catch(error){
      AppSnackbar('error', 'Failed, something went wrong')
      throw new Error(error)
    }
  }
)

export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id)=>{
    try{
      const response = await axios.delete(`${BASE_URL}/companies/delete/${id}`,{
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


const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addIncharge: (state, action) => {
      state.incharges = [...(state.incharges || []), action.payload];
    },
    deleteIncharge: (state, action) => {
      const inchargeIndex = state.incharges.findIndex(
        (incharge) => incharge.id === action.payload
      );
      if (inchargeIndex !== -1) {
        state.incharges.splice(inchargeIndex, 1);
      }
    },
    resetIncharge: (state)=>{
      state.incharges = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.coms = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.com = action.payload;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  addIncharge,
  deleteIncharge,
  resetIncharge
} = companySlice.actions

export default companySlice.reducer;
