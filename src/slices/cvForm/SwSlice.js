import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL,HEADERS } from "../../utils/config";
import axios from "axios";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
    data: [],
    loading: false,
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null,
    step5Data: null,
    allData: null,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
};


export const createCv = createAsyncThunk(
    'sw/createCv',
    async (cvData) => {
      try {
        const response = await axios.post(`${BASE_URL}/swdata/create`, cvData,{
          headers: HEADERS()
        });
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw error;
      }
    }
  );

const SwSlice = createSlice({
    name: 'sw',
    initialState: initialState,
    reducers: {
        setStep1Data: (state,action)=>{
            state.step1Data ? state.step1Data = { ...action.payload }
            : state.step1Data = action.payload       
        },
        setStep2Data: (state,action)=>{
            state.step2Data ? state.step2Data = { ...action.payload }
            : state.step2Data = action.payload    
        },
        setStep3Data: (state,action)=>{
            state.step3Data ? state.step3Data = [ ...action.payload ]
            : state.step3Data = action.payload      
        },
        setStep4Data: (state,action)=>{
            state.step4Data ? state.step4Data = [ ...action.payload ]
            : state.step4Data = action.payload      
        },
        setStep5Data: (state,action)=>{
            state.step5Data ? state.step5Data = { ...action.payload }
            : state.step5Data = action.payload      
        },
        getAllSwData: (state)=>{
            const skills = []
            const experiences = []

            state.step3Data.map(el=> skills.push({
                name: el.name,
                year_month: el.year_month,
            }))

            state.step4Data.map(el=> experiences.push({
                position: el.position,
                company: el.company,
                business_type: el.business_type,
                responsibilities: el.responsibilities,
                reason_of_leaving: el.reason_for_leaving,
                start: el.start,
                end: el.end
            }))
            
            state.allData = {
                ...state.step1Data,
                ...state.step2Data,
                ...{ skill_data : skills },
                ...{ work_exp_data : experiences },
                ...{
                    pr: state.step5Data.pr,
                    photo_data: state.step5Data.photo_data,
                    qr_photo_data: state.step5Data.qr_photo_data
                },
            }
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createCv.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCv.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.snackbarOpen = true;
            state.snackbarMessage = "Successfully Created";
            state.snackbarSeverity = "success";
        })
        .addCase(createCv.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.snackbarOpen = true;
            state.snackbarMessage = "Failed. Something went wrong.";
            state.snackbarSeverity = "error";
        })
    }
})

export const {
    setStep1Data,
    setStep2Data,
    setStep3Data,
    setStep4Data,
    setStep5Data,
    getAllSwData,
} = SwSlice.actions

export default SwSlice.reducer