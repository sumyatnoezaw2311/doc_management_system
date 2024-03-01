import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
    oldData: null,
    data: null,
    loading: false,
    error: null
}

export const updateCvForm = createAsyncThunk(
    "swUpdate/update",
    async ({ data, id }) => {
        try {
          const config = {
            method: 'post',
            url: `${BASE_URL}/swdata/update/${id}`,
            headers: HEADERS(),
            data: data,
          };
            const response = await axios(config);
            AppSnackbar('success', 'Successfully Updated')
            return response.data
        }catch(error){
            AppSnackbar('error', 'Failed, something went wrong')
            console.log(error);
            throw new Error(error);
        }
    }
)

const updateSwSlice = createSlice({
    name: 'swUpdate',
    initialState,
    reducers: {
        getOldData: (state,action)=>{
            const convertedData = {
                user_id: action.payload.user_id,
                name_eng: action.payload.name_eng,
                name_jp: action.payload.name_jp,
                gender: action.payload.gender === '男' ? "ကျား" : "မ",
                phone: action.payload.phone,
                email: action.payload.email,
                date_of_birth: action.payload.date_of_birth,
                address_eng: action.payload.address_eng,
                address_jp: action.payload.address_jp,
                family_address: action.payload.family_address,
                family_phone: action.payload.family_phone,
                marriage_status: action.payload.marriage_status === "既婚" ? "ရှိ" : "မရှိ",
                dependent_family: action.payload.dependent_family,
                uni_name: action.payload.uni_name,
                uni_start: action.payload.uni_start,
                uni_end: action.payload.uni_end,
                hs_name: action.payload.hs_name,
                hs_end: action.payload.hs_end,
                is_graduated: action.payload.is_graduated,
                major: action.payload.major,
                last_attended_year: action.payload.last_attended_year ? action.payload.last_attended_year : 'no data',
                pr: action.payload.pr,
                photo_data: action.payload.photo,
                qr_photo_data: action.payload.qr_photo,
            }
            state.oldData = convertedData
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(updateCvForm.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateCvForm.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(updateCvForm.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    }
})

export const {
    getOldData
} = updateSwSlice.actions

export default updateSwSlice.reducer