import React, { useEffect, useState } from "react";
import CreateLayout from "../../../components/layouts/CreateLayout";
import {
  Box,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createCv } from "../../../slices/cvForm/SwSlice";
import OneItemBox from "../../../components/tit-ssw/OneItemBox";
import TwoItemsBox from "../../../components/tit-ssw/TwoItemsBox";
import SkillList from "../../../components/sw/SkillList";
import ExpList from "../../../components/sw/ExpList";
import Loading from "../../../components/utils/Loading";

const ConfirmForSubmitSw = () => {
  const allData = useSelector((state) => state.SwCv.allData);
  const profileData = useSelector((state) => state.User.profile?.data);
  const loading = useSelector(state => state.SwCv.loading)
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const cvData = await {
      ...allData,
      ...{
        user_id: profileData.id,
        email: profileData.email,
        phone: profileData.phone,
      },
    };
    const cvCreate = await dispatch(createCv(cvData));
    if (cvCreate.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  const handleCancel = () => navigate(-1);

  useEffect(()=>{
    if(allData && profileData){
      setData(allData)
    }
  },[allData,profileData])


  return (
      (allData == null || allData === undefined) ? <Navigate to={'/create-cv/sw/1'}/>
      :
      <CreateLayout title="ဖြည့်ထားသောအချက်အလတ်များ မှန်/မမှန် ပြန်စစ်ပါ">
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Divider>STEP-1</Divider>
        {
          loading && <Loading/>
        }
        <OneItemBox label="အမည် (အင်္ဂလိပ်)" value={data?.name_eng} />
        <OneItemBox label="အမည် (Japanese)" value={data?.name_jp} />
        <OneItemBox label="မွေးသက္ကရာဇ်" value={data?.date_of_birth} />
        <OneItemBox label="ကျား/မ" value={data?.gender} />
        <OneItemBox label="အိမ်ထောင် ရှိ / မရှိ" value={data?.marriage_status} />
        <OneItemBox label="နေရပ်လိပ်စာ(English)" value={data?.address_eng} />
        <OneItemBox label="နေရပ်လိပ်စာ(Japanese)" value={data?.address_jp} />
        <OneItemBox label="မိသားစုနေရပ်လိပ်စာ" value={data?.family_address} />
        <OneItemBox label="မိသားစုနေဖုန်းနံပါတ်" value={data?.family_phone} />
        <OneItemBox label="မှီခိုနေသောမိသားစုဝင်ဦးရေ" value={data?.family_phone} />
        <Divider sx={{  mt: 3 }}>STEP-2</Divider>
        <OneItemBox label={"အထက်တန်းကျောင်း"} value={data?.hs_name}></OneItemBox>
        <OneItemBox label={"အထက်တန်းကျောင်းပြီးသောခုနှစ်နှင့်လ"} value={data?.hs_end}></OneItemBox>
        <OneItemBox label={"ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား"} value={data?.is_graduated === 1 ? "ဘွဲ့ရ" : "ကျောင်းနား"}></OneItemBox>
        <OneItemBox label={"တက္ကသိုလ်အမည်"} value={data?.uni_name}></OneItemBox>
        <TwoItemsBox
          label1="တက္ကသိုလ်အမည်"
          value1={data?.uni_name}
          label2="မေဂျာ"
          value2={data?.major}
        />
        <OneItemBox label={"ကာလ"} value={`${data?.uni_start} ~ ${data?.uni_end}`}></OneItemBox>
        {
          data?.is_graduated === 0 &&
          <OneItemBox label={"နောက်ဆုံးတက်ရောက်ခဲ့သောနှစ်"} value={data?.last_attended_year}></OneItemBox>
        }
        <Divider sx={{ mt: 3 }}>STEP-3</Divider>
        {data && data.skill_data && (
          <SkillList listItems={data.skill_data} />
        )}
        <Divider sx={{ mt: 3 }}>STEP-4</Divider>
        {data && data.work_exp_data && (
          <ExpList listItems={data?.work_exp_data}></ExpList>
        )}
        <Divider>STEP-5</Divider>
        <OneItemBox label={"PR"} value={data?.pr}></OneItemBox>
        <Typography variant="body1" mb={1} mt={2}>
          Your images
        </Typography>
        <ImageList sx={{ width: "100%", my: 3 }}>
          <ImageListItem key={data?.photo_data}>
            <img src={data?.photo_data} />
          </ImageListItem>
          <ImageListItem key={data?.qr_photo_data}>
            <img src={data?.qr_photo_data} />
          </ImageListItem>
        </ImageList>
        <Box sx={{ width: "350px", mb: 3, display: "flex", gap: 1 }}>
          <Button
            onClick={() => handleCancel()}
            variant="outlined"
            sx={{ width: "50%" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            sx={{ width: "50%", color: "white" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      </CreateLayout>
  );
};

export default ConfirmForSubmitSw;
