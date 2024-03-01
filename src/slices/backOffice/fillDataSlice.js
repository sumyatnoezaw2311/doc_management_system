import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";
import { stateOrDivision } from "../../utils/stateOrDivision";

const initialState = {
  getOldFillData: null,
  getOldFillDataSw: null,
  data: null,
  loading: false,
  error: null,
};

export const fillData = createAsyncThunk(
  "fill/create",
  async ({type,id,data})=>{
    try{
      const response = await axios.post(`${BASE_URL}/${type}data/fill/${id}`,
        data
      ,{
        headers: HEADERS()
      })
      AppSnackbar('success', 'Successfully Created')
      return response.data
    }catch(error){
      AppSnackbar('error', 'Failed, something went wrong')
      console.log(error);
      throw new Error(error)
    }
  }
)

export const updateFillData = createAsyncThunk(
  "fill/update",
  async ({type,id,data})=>{
    try{
      const response = await axios.post(`${BASE_URL}/${type}data/fill/${id}`, 
        data
      ,{
        headers: HEADERS()
      })
      AppSnackbar('success', 'Successfully Updated')
      return response.data
    }catch(error){
      AppSnackbar('error', 'Failed, something went wrong')
      console.log(error);
      throw new Error(error)
    }
  }
)

const fillDataSlice = createSlice({
  name: "fillData",
  initialState,
  reducers: {
    getOldFillData: (state,action)=>{
      const fillOldData = {
        passport: action.payload.passport,
        nrc_eng: action.payload.nrc_eng,
        nrc_mm: action.payload.nrc_mm,
        name_mm: action.payload.name_mm,
        father_name_mm: action.payload.father_name_mm,
        father_name_eng: action.payload.father_name_eng,
        mother_name_mm: action.payload.mother_name_mm,
        mother_name_eng: action.payload.mother_name_eng,
        state_or_division_address: stateOrDivision(action.payload.state_or_division_address),
        rest_of_address_mm: action.payload.rest_of_address_mm, 
        rest_of_address_eng: action.payload.rest_of_address_eng,
        ethnicity_religion_mm: action.payload.ethnicity_religion_mm,
        edu_status: action.payload.edu_status,
      }
      state.getOldFillData = fillOldData
    },
    getOldFillDataSw: (state,action)=>{
      const fillOldDataSw = {
        passport: action.payload.passport,
        nrc_mm: action.payload.nrc_mm,
        name_mm: action.payload.name_mm,
        state_or_division_address: stateOrDivision(action.payload.state_or_division_address),
        districts: action.payload.districts,
        townships: action.payload.townships,
        ward_or_village: action.payload.ward_or_village,
        road: action.payload.road,
        address_no: action.payload.address_no,
        father_name_mm: action.payload.father_name_mm,
        father_name_eng: action.payload.father_name_eng,
        mother_name_mm: action.payload.mother_name_mm,
        mother_name_eng: action.payload.mother_name_eng,
        hometown_mm: action.payload.hometown_mm,
        ethnicity_region_mm: action.payload.ethnicity_region_mm,
        promient_mark: action.payload.promient_mark,
        inheritance_name_mm: action.payload.inheritance_name_mm,
        inheritance_relationship_mm: action.payload.inheritance_relationship_mm,
        inheritance_nrc_mm: action.payload.inheritance_nrc_mm,
        inheritance_phone: action.payload.inheritance_phone,
        inheritance_state_or_division_address: action.payload.inheritance_state_or_division_address,
        inheritance_districts: action.payload.inheritance_districts,
        inheritance_townships: action.payload.inheritance_townships,
        inheritance_ward_or_village: action.payload.inheritance_ward_or_village,
        inheritance_road: action.payload.inheritance_road,
        inheritance_address_no: action.payload.inheritance_address_no,
        edu_status: action.payload.edu_status,
      }
      state.getOldFillDataSw = fillOldDataSw;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fillData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fillData.fulfilled, (state, action) => {
        state.loading = false;
        state.coms = action.payload;
      })
      .addCase(fillData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  getOldFillData,
  getOldFillDataSw
} = fillDataSlice.actions

export default fillDataSlice.reducer;
