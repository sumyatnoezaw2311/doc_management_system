import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  incharges: [],
  orgs: null,
  org: null,
  data: null,
  loading: false,
  error: null,
};

export const getOrganizations = createAsyncThunk(
    "organization/getAllOrg",
    async ()=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/organizations`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const getOrganizationById = createAsyncThunk(
    "organization/getOrgById",
    async (id)=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/organizations/${id}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )


export const createOrganization = createAsyncThunk(
  "organization/create",
  async (orgData)=>{
    try{
      const response = await axios.post(`${BASE_URL}/organizations/create`, orgData,{
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

export const updateOrganization = createAsyncThunk(
  "organization/update",
  async ({orgData,id})=>{
    try{
      const response = await axios.post(`${BASE_URL}/organizations/update/${id}`, orgData,{
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

export const deleteOrganization = createAsyncThunk(
  "organization/delete",
  async (id)=>{
    try{
      const response = await axios.delete(`${BASE_URL}/organizations/delete/${id}`,{
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


const organizationSlice = createSlice({
  name: "organization",
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
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.orgs = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrganizationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizationById.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload;
      })
      .addCase(getOrganizationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  addIncharge,
  deleteIncharge,
  resetIncharge
} = organizationSlice.actions

export default organizationSlice.reducer;
