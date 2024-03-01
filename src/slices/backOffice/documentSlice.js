import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  oldDataDemandSw: null,
  oldDataDemand: null,
  data: null,
  loading: false,
  error: null,
};


  export const createDemand = createAsyncThunk(
    "document/createDemand",
    async ({ data,gpId })=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/demand-letter/create/${gpId}`,
            data ,
        {
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

  export const updateDemand = createAsyncThunk(
    "document/updateDemand",
    async ({ data,gpId })=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/demand-letter/update/${gpId}`,
            data ,
        {
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

  export const createCoe = createAsyncThunk(
    "document/createCoe",
    async (data)=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/coe-data/create`,
            data ,
        {
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

  export const updateCoe = createAsyncThunk(
    "document/updateCoe",
    async ({data,coeId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/coe-data/update/${coeId}`,
            data ,
        {
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

  export const createPredeparture = createAsyncThunk(
    "document/createPredeparture",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/predeparture-date/create/${gpId}`,
            data ,
        {
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

  export const updatePredeparture = createAsyncThunk(
    "document/updatePredeparture",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/predeparture-date/update/${gpId}`,
            data ,
        {
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

  export const createDeparture = createAsyncThunk(
    "document/createDeparture",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/departure-date/create/${gpId}`,
            data ,
        {
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

  export const updateDeparture = createAsyncThunk(
    "document/updateDeparture",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/departure-date/update/${gpId}`,
            data ,
        {
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

  export const createSmartCard = createAsyncThunk(
    "document/createSmartCard",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/smartcard-date/create/${gpId}`,
            data ,
        {
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

  export const updateSmartCard = createAsyncThunk(
    "document/updateSmartCard",
    async ({data,gpId})=>{
      try{
        const response = await axios.post(`${BASE_URL}/group/smartcard-date/update/${gpId}`,
            data ,
        {
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
  
  export const generatePdf = createAsyncThunk(
    "document/generatePdf",
    async (option)=>{
      console.log(option);
      try{
        const response = await axios.post(`${BASE_URL}/pdf/generate`,
            option ,
        {
          headers: HEADERS()
        })
        AppSnackbar('success', 'Successfully Generated')
        return response.data
      }catch(error){
        console.log(error);
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error)
      }
    }
  )

  export const downAtBlink = createAsyncThunk(
    "document/downAtBlink",
    async ({url,filename})=>{    
      try {
        const AxiosRequestConfig = {
          method: 'GET',
          url: url,
          responseType: 'arraybuffer',
          headers: HEADERS(),
        };
        const response = await axios(AxiosRequestConfig);
        const outputFilename = filename;
        const blob = new Blob([response.data]);
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = outputFilename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        console.log('Successfully Downloaded');
      } catch (error) {
        console.log("error is occuring");
        throw new Error(error)
      }
    }
  )

  const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
      getOldDataDemand: (state,action)=>{
        const oldData = {
            job_category_eng: action.payload.job_category_eng,
            job_category_mm: action.payload.job_category_mm,
            job_category_jp: action.payload.job_category_jp,
            work_place: action.payload.work_place,
            working_day_eng: action.payload.working_day_eng,
            working_day_mm: action.payload.working_day_mm,
            holiday_eng: action.payload.holiday_eng,
            holiday_mm: action.payload.holiday_mm,
            working_hours_eng: action.payload.working_hours_eng,
            working_hours_mm: action.payload.working_hours_mm,
            qualification_eng: action.payload.qualification_eng,
            qualification_mm: action.payload.qualification_mm,
            basic_salary: action.payload.basic_salary,
            payment_method: action.payload.payment_method,
            accommodation: action.payload.accommodation,
            demand_letter_date: action.payload.demand_letter_date,
            oath_date: action.payload.oath_date,
            training_period_wage_scale: action.payload.training_period_wage_scale
        }
        state.oldDataDemand = oldData
      },
      getOldDataDemandSw: (state,action)=>{
        const oldData = {
            job_category_eng: action.payload.job_category_eng,
            job_category_mm: action.payload.job_category_mm,
            job_category_jp: action.payload.job_category_jp,
            work_place: action.payload.work_place,
            working_day_eng: action.payload.working_day_eng,
            working_day_mm: action.payload.working_day_mm,
            holiday_eng: action.payload.holiday_eng,
            holiday_mm: action.payload.holiday_mm,
            working_hours_eng: action.payload.working_hours_eng,
            working_hours_mm: action.payload.working_hours_mm,
            qualification_eng: action.payload.qualification_eng,
            qualification_mm: action.payload.qualification_mm,
            basic_salary: action.payload.basic_salary,
            payment_method: action.payload.payment_method,
            accommodation: action.payload.accommodation,
            demand_letter_date: action.payload.demand_letter_date,
            oath_date: action.payload.oath_date
        }
        state.oldDataDemandSw = oldData
      },
      resetOldData: (state)=>{
        state.oldDataDemand = null
        state.oldDataDemandSw = null
      },
      resetLink : (state)=>{
        state.data = null
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createDemand.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createDemand.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(createDemand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateDemand.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateDemand.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(updateDemand.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createCoe.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
      .addCase(createCoe.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
      .addCase(createCoe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
      .addCase(updateCoe.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateCoe.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(updateCoe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
        .addCase(createPredeparture.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createPredeparture.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(createPredeparture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updatePredeparture.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updatePredeparture.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(updatePredeparture.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createDeparture.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(createDeparture.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(createDeparture.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(updateDeparture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeparture.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(updateDeparture.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createSmartCard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
      .addCase(createSmartCard.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
      .addCase(createSmartCard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
      .addCase(updateSmartCard.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateSmartCard.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(updateSmartCard.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(generatePdf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePdf.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(generatePdf.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(downAtBlink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downAtBlink.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(downAtBlink.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
    }
  })

export const {
  getOldDataDemand,
  getOldDataDemandSw,
  resetOldData,
  resetLink
} = documentSlice.actions

export default documentSlice.reducer