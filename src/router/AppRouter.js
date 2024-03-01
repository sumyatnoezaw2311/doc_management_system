import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/common/HomePage";

//titssw
import TitSswRoute from "./TitSswRoute";
import CreateTITSSW1 from "../pages/cv_form/TIT_SSW/CreateCvStep1";
import CreateTITSSW2 from "../pages/cv_form/TIT_SSW/CreateCvStep2";
import CreateTITSSW3 from "../pages/cv_form/TIT_SSW/CreateCvStep3";
import CreateTITSSW4 from "../pages/cv_form/TIT_SSW/CreateCvStep4";
import CreateTITSSW5 from "../pages/cv_form/TIT_SSW/CreateCvStep5";
import CreateTITSSW6 from "../pages/cv_form/TIT_SSW/CreateCvStep6";
import CreateTITSSW7 from "../pages/cv_form/TIT_SSW/CreateCvStep7";
import CreateTITSSW8 from "../pages/cv_form/TIT_SSW/CreateCvStep8";
import CreateTITSSW9 from "../pages/cv_form/TIT_SSW/CreateCvStep9";
import ConfirmForSubmit from "../pages/cv_form/TIT_SSW/ConfirmForSubmit";

//sw
import CreateSW1 from "../pages/cv_form/SW/CreateCvSw1";
import CreateSW2 from "../pages/cv_form/SW/CreateCvSw2";
import CreateSW3 from "../pages/cv_form/SW/CreateCvSw3";
import CreateSW4 from "../pages/cv_form/SW/CreateCvSw4";
import AfterRegister from "../pages/common/AfterRegister";
import ConfirmForSubmitSw from "../pages/cv_form/SW/ConfirmForSubmitSw";

//edit pr
import EditPr from "../pages/cv_form/TIT_SSW/EditPr";


//admin panel
import AdminLayout from '../components/layouts/AdminLayout'
import PendingUsersList from "../pages/back_office/pendingUsers/PendingUsersList";
import OrgDetail from "../pages/back_office/organizations/OrgDetail";
import OrganizationsList from "../pages/back_office/organizations/OrganizationsList";
import CreateOrganization from "../pages/back_office/organizations/CreateOrganization";
import EditOrganization from "../pages/back_office/organizations/EditOrganization";
import CompaniesList from "../pages/back_office/companies/CompaniesList";
import CreateCompany from "../pages/back_office/companies/CreateCompany";
import ComDetail from "../pages/back_office/companies/ComDetail";
import EditCompany from "../pages/back_office/companies/EditCompany";
import GroupsList from "../pages/back_office/interviewGroup/GroupsList";
import CvsList from "../pages/back_office/cvs/CvsList";
import CvDetailTitssw from "../pages/back_office/cvs/CvDetailTitssw";
import CvDetailSw from "../pages/back_office/cvs/CvDetailSw";
// import EditCvTitssw from "../pages/back_office/cvs/EditCvTitssw";
// import EditCvSw from "../pages/back_office/cvs/EditCvSw";

//utils
import NotFound from "../components/utils/NotFound";
import GroupDocs from "../pages/back_office/interviewGroup/GroupDocs";
import UsersList from "../pages/back_office/usersList/UsersList";
import SwRoute from "./SwRoute";
import BackOfficeRoute from "./BackOfficeRoute";
import { useDispatch } from "react-redux";
import { logOut, refreshToken } from "../slices/auth/authSlice";
import GroupEdit from "../pages/back_office/interviewGroup/GroupEdit";
import ForgotPassword from "../pages/auth/ForgotPassword";
import HolidaysList from "../pages/back_office/holidays/HolidaysList";
import RejectedAccounts from "../pages/back_office/pendingUsers/RejectedAccounts";
import ResetPassword from "../pages/auth/ResetPassword";


const CreateCvStepTITSSW = () => {
  const { step } = useParams();
  let component;
  switch (step) {
    case "1":
      component = <CreateTITSSW1 />;
      break;
    case "2":
      component = <CreateTITSSW2 />;
      break;
    case "3":
      component = <CreateTITSSW3 />;
      break;
    case "4":
      component = <CreateTITSSW4 />;
      break;
    case "5":
      component = <CreateTITSSW5 />;
      break;
    case "6":
      component = <CreateTITSSW6 />;
      break;
    case "7":
      component = <CreateTITSSW7 />;
      break;
    case "8":
      component = <CreateTITSSW8 />;
      break;
    case "9":
      component = <CreateTITSSW9 />;
      break;
    case "edit-pr":
      component = <EditPr />;
      break;
    default:
      component = <NotFound></NotFound>;
      break;
  }

  return component;
};

const CreateCvStepSW = () => {
  const { step } = useParams();
  let component;
  switch (step) {
    case "1":
      component = <CreateSW1 />;
      break;
    case "2":
      component = <CreateSW2 />;
    break;
    case "3":
      component = <CreateSW3 />;
    break;
    case "4":
      component = <CreateSW4 />;
    break;
    case "5":
      component = <CreateTITSSW9 />;
    break;
    default:
      component = <NotFound></NotFound>;
      break;
  }

  return component;
};

const BackOffice = () => {
  const { page } = useParams();
  let component;
  switch (page) {
    case "pending-list":
      component = <PendingUsersList />;
      break;
    case "rejected-list":
      component = <RejectedAccounts />;
      break;
    case "users-list":
      component = <UsersList />;
      break;
    case "organizations-list":
      component = <OrganizationsList />;
      break;
    case "interview-groups":
      component = <GroupsList />;
      break;
    case "create-organization":
      component = <CreateOrganization />;
      break;
    case "create-company":
      component = <CreateCompany />;
      break;
    case "companies-list":
      component = <CompaniesList />;
      break;
    case "cvs-list":
      component = <CvsList />;
      break;
    default:
      component = <NotFound></NotFound>;
      break;
  }
  return component;
};

const AppRouters = () => {

  // const dispatch = useDispatch()
  // let authData = JSON.parse(localStorage.getItem('cmauth2023'))

  // const tokenRefresh = async ()=>{
  //   let tokenExpirationTimeStamp = authData.timeStamp + 3000
  //   const currentTime = Math.floor(Date.now()/1000);
  //   const timeUntilExpiration = tokenExpirationTimeStamp - currentTime;
  //   if(authData && timeUntilExpiration > 0){
  //     await setTimeout(()=>{
  //       dispatch(refreshToken())
  //     },timeUntilExpiration * 1000)
  //   }else if(timeUntilExpiration < -5){
  //     dispatch(logOut())
  //     window.location.reload()
  //   }
  // }


  // useEffect(()=>{
  //   if(authData){
  //     tokenRefresh()
  //   }
  // },[authData])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:oneTimeToken" element={<ResetPassword />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/after-register" element={<AfterRegister/>}></Route>
          <Route path="/edit-pr" element={<EditPr/>}></Route>
          <Route path="/create-cv/tit-ssw" element={<TitSswRoute/>} >
            <Route path="/create-cv/tit-ssw/:step" element={<CreateCvStepTITSSW />} />
            <Route path="/create-cv/tit-ssw/confirmation" element={<ConfirmForSubmit />} />
          </Route>
          <Route path="/create-cv/sw" element={<SwRoute/>}>
            <Route path="/create-cv/sw/confirmation" element={<ConfirmForSubmitSw />} />
            <Route path="/create-cv/sw/:step" element={<CreateCvStepSW />} />
          </Route>
          <Route path="/back-office" element={<BackOfficeRoute/>}>
            <Route path="/back-office/:page" element={<AdminLayout><BackOffice /></AdminLayout>} />
            <Route path="/back-office/organization-detail/:id" element={<AdminLayout><OrgDetail /></AdminLayout>} />
            <Route path="/back-office/organization-edit/:id" element={<AdminLayout><EditOrganization /></AdminLayout>} />
            <Route path="/back-office/company-detail/:id" element={<AdminLayout><ComDetail /></AdminLayout>} />
            <Route path="/back-office/company-edit/:id" element={<AdminLayout><EditCompany /></AdminLayout>} />
            <Route path="/back-office/cv-detail-titssw/:id" element={<AdminLayout><CvDetailTitssw /></AdminLayout>} />
            <Route path="/back-office/cv-detail-sw/:id" element={<AdminLayout><CvDetailSw /></AdminLayout>} />
            <Route path="/back-office/group-docs-titssw/:id" element={<AdminLayout><GroupDocs /></AdminLayout>} />
            <Route path="/back-office/group-docs-sw/:id" element={<AdminLayout><GroupDocs /></AdminLayout>} />
            <Route path="/back-office/group-edit-titssw/:id" element={<AdminLayout><GroupEdit /></AdminLayout>} />
            <Route path="/back-office/group-edit-sw/:id" element={<AdminLayout><GroupEdit /></AdminLayout>} />
            <Route path="/back-office/holidays" element={<AdminLayout><HolidaysList /></AdminLayout>} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;