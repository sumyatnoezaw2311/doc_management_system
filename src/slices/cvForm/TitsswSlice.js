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
    step6Data: null,
    step7Data: null,
    step8Data: null,
    step9Data: null,
    allData: null,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
};


export const createCv = createAsyncThunk(
    'titssw/createCv',
    async (cvData) => {
      try {
        const response = await axios.post(`${BASE_URL}/titsswdata/create`, cvData ,{
          headers: HEADERS()
        });
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        if(error.response.status === 413){
            AppSnackbar('error', 'Content too long, please check your image size')
        }else{
            AppSnackbar('error', 'Failed, something went wrong')
        }
        throw error;
      }
    }
  );

const TitsswSlice = createSlice({
    name: 'titssw',
    initialState: initialState,
    reducers: {
        setStep1Data: (state,action)=>{
            state.step1Data ? state.step1Data = { ...action.payload }
            : state.step1Data = action.payload       
        },
        setStep2Data: (state,action)=>{
            const newPayload = Object.fromEntries(
                Object.entries(action.payload).map(([key, value]) => [key, value === true ? 1 : value === false ? 0 : value])
            );
            state.step2Data ? state.step2Data = { ...newPayload }
            : state.step2Data = newPayload
        },
        setStep3Data: (state,action)=>{
            state.step3Data ? state.step3Data = { ...action.payload }
            : state.step3Data = action.payload      
        },
        setStep4Data: (state,action)=>{
            state.step4Data ? state.step4Data = { ...action.payload }
            : state.step4Data = action.payload      
        },
        setStep5Data: (state,action)=>{
            state.step5Data ? state.step5Data = { ...action.payload }
            : state.step5Data = action.payload      
        },
        setStep6Data: (state,action)=>{
            state.step6Data ? state.step6Data = [ ...action.payload ]
            : state.step6Data = action.payload      
        },
        setStep7Data: (state,action)=>{
            state.step7Data ? state.step7Data = [ ...action.payload ]
            : state.step7Data = action.payload      
        },
        setStep8Data: (state,action)=>{
            state.step8Data ? state.step8Data = [ ...action.payload ]
            : state.step8Data = action.payload      
        },
        setStep9Data: (state,action)=>{
            state.step9Data ? state.step9Data = { ...action.payload }
            : state.step9Data = action.payload      
        },
        getAllData: (state)=>{
            const otherEducation = []
            const jobData = []
            const memberData = []
            state.step6Data.map(el=> otherEducation.push({
                name: el.name,
                start: el.start,
                end: el.end
            }))
            state.step7Data.map(el=> jobData.push({
                start: el.start_date,
                end: el.end_date,
                business_type: el.job_category,
                position: el.position,
                company: el.company_name,
                location: el.location
            }))
            state.step8Data.map(el=> memberData.push({
                name: el.name,
                relationship: el.relation,
                age: el.age,
                job: el.job,
                address: el.address
            }))
            
            state.allData = {
                ...state.step1Data,
                ...state.step2Data,
                ...state.step3Data,
                ...state.step4Data,
                ...state.step5Data,
                ...{ other_edu_data : otherEducation},
                ...{ work_exp_data : jobData},
                ...{ family_data : memberData},
                ...{
                    pr: state.step9Data.pr,
                    photo_data: state.step9Data.photo_data,
                    qr_photo_data: state.step9Data.qr_photo_data
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
    setStep6Data,
    setStep7Data,
    setStep8Data,
    setStep9Data,
    getAllData,
} = TitsswSlice.actions

export default TitsswSlice.reducer