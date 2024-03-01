import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  groups: null,
  group: null,
  collection: [],
  add: false,
  toAddGpId: null,
  toAddMembers: null,
  data: null,
  loading: false,
  error: null,
};

  export const getAllGroup = createAsyncThunk(
    "interviewGroup/getAllGroup",
    async ({pageNo,keyword,companyId})=>{
      try {
          let urlParam = "";
          if(pageNo){
            urlParam = `?page=${pageNo}`
          }else if(keyword || companyId){
            urlParam = `/search?${companyId ? `company_id=${companyId}` : "" }&${keyword ? `keyword=${keyword}` : ""}`
          }
          const config = {
              method: 'get',
              url: `${BASE_URL}/group${urlParam}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const getGroupById = createAsyncThunk(
    "interviewGroup/getGroupById",
    async (id)=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/group/${id}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          console.log(error);
          throw new Error(error);
      }
    }
  )

  export const createIntGroup = createAsyncThunk(
    "interviewGroup/create",
    async (gpData)=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/create`, gpData ,{
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

  export const updateIntGroup = createAsyncThunk(
    "interviewGroup/update",
    async ({gpData,id})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/update/${id}`, gpData ,{
          headers: HEADERS()
        })
        AppSnackbar('success', 'Successfully Updated')
        return response.data
    }catch(error){
        console.log(error);
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error)
      }
    }
  )

  export const deleteGroup = createAsyncThunk(
    "interviewGroup/delete",
    async (id)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/group/delete/${id}`,{
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

  export const deleteMemberFromGroup = createAsyncThunk(
    "interviewGroup/deleteMember",
    async (memId)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/group/member/remove/${memId}`,{
          headers: HEADERS()
        })
        AppSnackbar('success', 'Successfully removed from this group')
        return response.data
    }catch(error){
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error)
      }
    }
  )

  export const addMemberToGroup = createAsyncThunk(
    "interviewGroup/addMemberToGroup",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/member/add/${gpId}`,
        { member_data: data } ,{
          headers: HEADERS()
        })
        AppSnackbar('success', 'Successfully added new member')
        return response.data
    }catch(error){
        console.log(error);
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error)
      }
    }
  )

const interviewGroupSlice = createSlice({
  name: "interviewGroup",
  initialState,
  reducers: {
    resetGroup: (state)=>{
      state.group = null
    },
    toggleAdd: (state)=>{
      state.add = !state.add;
    },
    setToAddGpId: (state,action)=>{
      state.toAddGpId = action.payload
    },
    createCollection : (state,action)=>{
      state.collection = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(getAllGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createIntGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIntGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createIntGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateIntGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIntGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateIntGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMemberFromGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMemberFromGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteMemberFromGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMemberToGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMemberToGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addMemberToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
      })
      .addCase(getGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { resetGroup, toggleAdd, setToAddGpId, createCollection } = interviewGroupSlice.actions

export default interviewGroupSlice.reducer;
