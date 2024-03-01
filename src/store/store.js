import { configureStore } from "@reduxjs/toolkit";
import EdOtherReducer from "../slices/cvForm/EdOther";

//auth
import User from '../slices/auth/authSlice'

//titssw
import TitsswCvReducer from "../slices/cvForm/TitsswSlice";
import UpdateTitsswReducer from "../slices/backOffice/updateTitsswslice";

//sw
import SwReducer from "../slices/cvForm/SwSlice";
import UpdateSwReducer from "../slices/backOffice/updateSwSlice";

//back office
import UserReducer from "../slices/backOffice/userSlice";
import OrganizationReducer from "../slices/backOffice/organizationSlice";
import CompanyReducer from "../slices/backOffice/companySlice";
import InterviewGroupReducer from '../slices/backOffice/interviewGpSlice'
import CvsReducer from '../slices/backOffice/cvFromSlice'
import ImgReducer from "../slices/backOffice/getImgSlice";
import DocumentReducer from "../slices/backOffice/documentSlice";
import FillDataReducer from "../slices/backOffice/fillDataSlice";
import HolidayReducer from "../slices/backOffice/holidaySlice";


export const appStore = configureStore({
    reducer: {
        edOthers : EdOtherReducer,
        User: User,
        TitSswCv: TitsswCvReducer,
        SwCv: SwReducer,
        Organization : OrganizationReducer,
        Company: CompanyReducer,
        IntGroup: InterviewGroupReducer,
        CvForm: CvsReducer,
        Image: ImgReducer,
        UsersList: UserReducer,
        UpdateTitssw: UpdateTitsswReducer,
        UpdateSw: UpdateSwReducer,
        Document: DocumentReducer,
        FillData: FillDataReducer,
        Holiday: HolidayReducer
    }
})