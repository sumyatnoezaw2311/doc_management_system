import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
    pendingUsers: null,
    acceptedUsers: null,
    rejectedUsers: null,
    data: null,
    loading: false,
    error: null
}

export const getPendingUsers = createAsyncThunk(
    'user/pendingUsers',
    async ({pageNo, keyword})=>{
        try{
            let urlParam = "";
            if(keyword){
                urlParam = `${BASE_URL}/users/search?account_status=pending&keyword=${keyword}`
            }else{
                urlParam = `${BASE_URL}/users/pending-list?page=${pageNo}`
            }
            const config = {
                method: 'get',
                url: urlParam,
                headers: HEADERS(),
            };
            const response = await axios(config);
            return response.data;
        }catch(error){
            throw new Error(error)
        }
    }
)

export const getAcceptedUsers = createAsyncThunk(
    'user/getAcceptedUsers',
    async ({status,pageNo,keyword})=>{
        try{
            let url = "";
            if(status === 'accepted' && !keyword){
                url =`${BASE_URL}/users/${status}-list?page=${pageNo}`
            }else if(status === 'accepted' && keyword){
                url = `${BASE_URL}/users/search?account_status=accept&keyword=${keyword}`
            }else{
                url = `${BASE_URL}/users/interview-${status}-list`
            }
            if(!status) return
            const config = {
                method: 'get',
                url: url,
                headers: HEADERS(),
            };
            const response = await axios(config);
            return response.data;
        }catch(error){
            throw new Error(error)
        }
    }
)

export const getRejectedUser = createAsyncThunk(
        'user/rejectedUsers',
        async ({pageNo, keyword})=>{
            try{
                let urlParam = "";
                if(keyword){
                    urlParam = `${BASE_URL}/users/search?account_status=reject&keyword=${keyword}`
                }else{
                    urlParam = `${BASE_URL}/users/rejected-list?page=${pageNo}`
                }
                const config = {
                    method: 'get',
                    url: urlParam,
                    headers: HEADERS(),
                };
                const response = await axios(config);
                return response.data;
            }catch(error){
                throw new Error(error)
            }
        }
    )

export const toggleAccountStatus = createAsyncThunk(
    "user/toggleAccountStatus",
    async ({status,id})=>{
      try{
        const response = await axios.post(`${BASE_URL}/users/update-account-status/${id}`,
        { status: status },
        {
          headers: HEADERS()
        })
        if(status === 'accept'){
            AppSnackbar('success', 'Successfully Accepted')
        }else if(status === 'reject'){
            AppSnackbar('success', 'Successfully Rejected')
        }else{
            AppSnackbar('success', 'Successfully Restored')
        }
        return response.data
    }catch(error){
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error)
      }
    }
  )

export const toggleIntStatus = createAsyncThunk(
  "user/toggleIntStatus",
  async ({status,id})=>{
  try{
    const response = await axios.post(`${BASE_URL}/users/update-interview-status/${id}`,
    { status: status },
    {
    headers: HEADERS()
    })
    AppSnackbar('success', 'Successfully Changed')
    return response.data
  }catch(error){
    AppSnackbar('error', 'Failed, something went wrong')
    throw new Error(error)
  }
  }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getPendingUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPendingUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingUsers = action.payload;
        })
        .addCase(getPendingUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(toggleAccountStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(toggleAccountStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(toggleAccountStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getAcceptedUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAcceptedUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.acceptedUsers = action.payload;
        })
        .addCase(getAcceptedUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getRejectedUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getRejectedUser.fulfilled, (state, action) => {
            state.loading = false;
            state.rejectedUsers = action.payload;
        })
        .addCase(getRejectedUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(toggleIntStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(toggleIntStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(toggleIntStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer