import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,HEADERS } from "../../utils/config";
import { AppSnackbar } from "../../components/utils/AppSnackbar";

const initialState = {
  downloadLink: null,
  cvs: null,
  cv: null,
  data: null,
  loading: false,
  error: null,
};

  export const getAllCvForm = createAsyncThunk(
    "cvForm/getAllCvForm",
    async ({type,pageNo, keyword})=>{
      try {
          let urlParam = "";
          if(keyword){
            urlParam = `/search?keyword=${keyword}`
          }else{
            urlParam = `?page=${pageNo}`
          }
          const config = {
              method: 'get',
              url: `${BASE_URL}/${type}data${urlParam}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const getCvById = createAsyncThunk(
    "cvForm/getCvById",
    async ({type,id})=>{
      try {
          const config = {
              method: 'get',  
              url: `${BASE_URL}/${type}data/${id}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          return response.data.data;
      } catch (error) {
          throw new Error(error);
      }
    }
  )

  export const downloadCvExcel = createAsyncThunk(
    "cvForm/download",
    async (userId)=>{
      try {
          const config = {
              method: 'get',
              url: `${BASE_URL}/excel/generate-cv/${userId}`,
              headers: HEADERS(),
          };
          const response = await axios(config);
          AppSnackbar('success', 'Successfully downloaded')
          return response.data.data;
      } catch (error) {
          AppSnackbar('error', 'Failed, something went wrong')
          throw new Error(error);
      }
    }
  )

  export const deleteCvForm = createAsyncThunk(
    "cvForm/delete",
    async ({type,id})=>{
      try{
        const response = await axios.delete(`${BASE_URL}/${type}data/delete/${id}`,{
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

  export const createOtherEdu = createAsyncThunk(
    "cvForm/createOtherEdu",
    async (data) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/otheredu/create`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  export const updateOtherEdu = createAsyncThunk(
    "cvForm/updateOtherEdu",
    async ({ data, id }) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/otheredu/update/${id}`,
          headers: HEADERS(),
          data: data,
        };
        AppSnackbar('success', 'Successfully Updated')
        const response = await axios(config);
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const deleteOtherEdu = createAsyncThunk(
    "cvForm/deleteOtherEdu",
    async (id)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/otheredu/delete/${id}`,{
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

  export const createWorkExp = createAsyncThunk(
    "cvForm/createWorkExp",
    async ({type,data}) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/${type}experience/create`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const updateWorkExp = createAsyncThunk(
    "cvForm/updateWorkExp",
    async ({ type, data, id }) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/${type}experience/update/${id}`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully updated')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const deleteWorkExp = createAsyncThunk(
    "cvForm/deleteWorkExp",
    async ({ type,id })=>{
      try{
        const response = await axios.delete(`${BASE_URL}/${type}experience/delete/${id}`, {
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

  export const createFamilyMember = createAsyncThunk(
    "cvForm/createFamilyMember",
    async (data) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/family/create`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const updateFamilyMember = createAsyncThunk(
    "cvForm/updateFamilyMember",
    async ({ data, id }) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/family/update/${id}`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Updated')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const deleteFamilyMember = createAsyncThunk(
    "cvForm/deleteFamilyMember",
    async (id)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/family/delete/${id}`, {
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

  //this is for sw type
  export const createNewSkill = createAsyncThunk(
    "cvForm/createNewSkill",
    async (data) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/skill/create`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  export const updateSkill = createAsyncThunk(
    "cvForm/updateSkill",
    async ({ data, id }) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/skill/update/${id}`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Updated')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

   //this is for sw type
  export const deleteSkill = createAsyncThunk(
    "cvForm/deleteSkill",
    async (id)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/skill/delete/${id}`, {
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

  //this is for sw type
  export const createChild = createAsyncThunk(
    "cvForm/createChild",
    async (data) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/children/create`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Created')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  //this is for sw type
  export const updateChild = createAsyncThunk(
    "cvForm/updateChild",
    async ({ data, id }) => {
      try {
        const config = {
          method: 'post',
          url: `${BASE_URL}/children/update/${id}`,
          headers: HEADERS(),
          data: data,
        };
        const response = await axios(config);
        AppSnackbar('success', 'Successfully Updated')
        return response.data;
      } catch (error) {
        AppSnackbar('error', 'Failed, something went wrong')
        throw new Error(error);
      }
    }
  );

  //this is for sw type
  export const deleteChild = createAsyncThunk(
    "cvForm/deleteChild",
    async (id)=>{
      try{
        const response = await axios.delete(`${BASE_URL}/children/delete/${id}`, {
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



const cvFormSlice = createSlice({
  name: "cvForm",
  initialState,
  reducers: {
    resetDownloadLink : (state)=>{
      state.downloadLink = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCvForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCvForm.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload;
      })
      .addCase(getAllCvForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCvById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCvById.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = action.payload;
      })
      .addCase(getCvById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCvForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCvForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCvForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(downloadCvExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadCvExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadLink = action.payload;
      })
      .addCase(downloadCvExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOtherEdu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOtherEdu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateOtherEdu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOtherEdu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOtherEdu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteOtherEdu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOtherEdu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOtherEdu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOtherEdu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWorkExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createWorkExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWorkExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateWorkExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWorkExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteWorkExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createNewSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createChild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChild.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateChild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChild.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteChild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChild.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { resetDownloadLink } = cvFormSlice.actions

export default cvFormSlice.reducer;
