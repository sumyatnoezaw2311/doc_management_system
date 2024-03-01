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
    "titsswUpdate/update",
    async ({ data, id }) => {
        try {
          const config = {
            method: 'post',
            url: `${BASE_URL}/titsswdata/update/${id}`,
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

const updateTitsswSlice = createSlice({
    name: 'titsswUpdate',
    initialState,
    reducers: {
        getOldData: (state,action)=>{
            const convertedData = {
                user_id: action.payload.user_id,
                name_eng: action.payload.name_eng,
                name_jp: action.payload.name_jp,
                phone: action.payload.phone,
                email: action.payload.email,
                date_of_birth: action.payload.date_of_birth,
                hometown: action.payload.hometown,
                height: Number(action.payload.height),
                weight: Number(action.payload.weight),
                blood_type: action.payload.blood_type,
                religion: action.payload.religion,
                eye_left: Number(action.payload.eye_left),
                eye_right: Number(action.payload.eye_right),
                japanese_level: action.payload.japanese_level,
                left_right_handed: action.payload.left_right_handed === "右" ? "ညာ" : "ဘယ်",
                gender: action.payload.gender === '男' ? "ကျား" : "မ",
                bicycle: action.payload.bicycle === '可' ? "စီးတတ်" : "မစီးတတ်",
                marriage_status: action.payload.marriage_status === "既婚" ? "ရှိ" : "မရှိ",
                group_live: action.payload.group_live === "無" ? "မရှိ" : "ရှိ",
                surgery: action.payload.surgery === "無" ? "မရှိ" : "ရှိ",
                betal: Number(action.payload.betal),
                cigrette: Number(action.payload.cigrette),
                tattoo: Number(action.payload.tattoo),
                alcohol: Number(action.payload.alcohol),
                hobby: action.payload.hobby,
                strong_point: action.payload.strong_point,
                weak_point: action.payload.weak_point,
                dream: action.payload.dream,
                ps_name: action.payload.ps_name,
                ps_start: action.payload.ps_start,
                ps_end: action.payload.ps_end,
                ms_name: action.payload.ms_name,
                ms_start: action.payload.ms_start,
                ms_end: action.payload.ms_end,
                hs_name: action.payload.hs_name,
                hs_start: action.payload.hs_start,
                hs_end: action.payload.hs_end,
                is_graduated: action.payload.is_graduated ? action.payload.is_graduated === "休学" ? "ကျောင်းနား" : "ဘွဲ့ရ" : null,
                uni_name: action.payload.uni_name,
                uni_start: action.payload.uni_start,
                uni_end: action.payload.uni_end,
                major: action.payload.major,
                last_attended_year: action.payload.last_attended_year,
                pr: action.payload.pr,
                matric_passed: Number(action.payload.matric_passed),
                memo: action.payload.memo,
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
} = updateTitsswSlice.actions

export default updateTitsswSlice.reducer