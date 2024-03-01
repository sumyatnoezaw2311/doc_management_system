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
import EduList from "../../../components/tit-ssw/EduList";
import JobsList from "../../../components/tit-ssw/JobsList";
import FamilyMembersList from "../../../components/tit-ssw/FamilyMembersList";
import { Navigate, useNavigate } from "react-router-dom";
import { createCv } from "../../../slices/cvForm/TitsswSlice";
import OneItemBox from "../../../components/tit-ssw/OneItemBox";
import TwoItemsBox from "../../../components/tit-ssw/TwoItemsBox";
import Loading from "../../../components/utils/Loading";

const ConfirmForSubmit = () => {
  const allData = useSelector((state) => state.TitSswCv.allData);
  const profileData = useSelector((state) => state.User.profile?.data);
  const loading = useSelector(state=> state.TitSswCv.loading)
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
      (allData == null || allData === undefined) ? <Navigate to={'/create-cv/tit-ssw/1'}/>
      :
      <CreateLayout title="ဖြည့်ထားသောအချက်အလတ်များ မှန်/မမှန် ပြန်စစ်ပါ">
        {
          loading && <Loading/>
        }
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Divider>STEP-1</Divider>
        <OneItemBox label="အမည် (အင်္ဂလိပ်)" value={data?.name_eng} />
        <OneItemBox label="အမည် (Katakana)" value={data?.name_jp} />
        <OneItemBox label="မွေးသက္ကရာဇ်" value={data?.date_of_birth} />
        <OneItemBox label="မွေးရပ်ဇာတိ" value={data?.hometown} />
        <TwoItemsBox
          label1="အရပ်"
          value1={`${data?.height} cm`}
          label2="ကိုယ်အလေးချိန်"
          value2={`${data?.weight} kg`}
        />
        <TwoItemsBox
          label1="သွေးအမျိုးအစား"
          value1={data?.blood_type}
          label2="ကိုးကွယ်သည့်ဘာသာ"
          value2={data?.religion}
        />
        <TwoItemsBox
          label1="မြင်နိုင်စွမ်း (ဘယ်)"
          value1={data?.eye_left}
          label2="မြင်နိုင်စွမ်း (ညာ)"
          value2={data?.eye_right}
        />
        <Divider sx={{  mt: 3 }}>STEP-2</Divider>
        <OneItemBox
          label={"ဂျပန်စာအရည်အချင်း"}
          value={data?.japanese_level}
        ></OneItemBox>
        <TwoItemsBox
          label1="ဘယ်သန် / ညာသန်"
          value1={data?.left_right_handed}
          label2="ကျား/မ"
          value2={data?.gender}
        />
        <TwoItemsBox
          label1="စက်ဘီး"
          value1={data?.bicycle}
          label2="အိမ်ထောင်"
          value2={data?.marriage_status}
        />
        <TwoItemsBox
          label1="အများနှင့်စုပေါင်းနေထိုင်ခြင်း"
          value1={data?.group_live}
          label2="ခွဲစိတ်ထားခြင်း"
          value2={data?.surgery}
        />
      </Box>
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Typography variant="body1" mb={1} mt={2}>
          ကြိုက်နှစ်သက်သောအရာ
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            color="text.secondary"
            mr={3}
            style={data?.betal === 0 ? { textDecoration: "line-through" } : {}}
            variant="body2"
          >
            ကွမ်း
          </Typography>
          <Typography
            color="text.secondary"
            mr={3}
            style={
              data?.cigrette === 0 ? { textDecoration: "line-through" } : {}
            }
            variant="body2"
          >
            ဆေးလိပ်
          </Typography>
          <Typography
            color="text.secondary"
            mr={3}
            style={
              data?.alcohol === 0 ? { textDecoration: "line-through" } : {}
            }
            variant="body2"
          >
            အရက်
          </Typography>
          <Typography
            color="text.secondary"
            mr={3}
            style={data?.tattoo === 0 ? { textDecoration: "line-through" } : {}}
            variant="body2"
          >
            တက်တူး
          </Typography>
        </Box>
        <Divider sx={{  mt: 3 }}>STEP-3</Divider>
        <OneItemBox label={"ကျွမ်းကျင်သည့်အရာ"} value={data?.hobby}></OneItemBox>
        <OneItemBox label={"အားသာချက်"} value={data?.strong_point}></OneItemBox>
        <OneItemBox label={"အားနည်းချက်"} value={data?.weak_point}></OneItemBox>
        <OneItemBox label={"အနာဂါတ်အိပ်မက်"} value={data?.dream}></OneItemBox>
        <Divider sx={{  mt: 3 }}>STEP-4</Divider>
        <OneItemBox label={"မူလတန်းကျောင်း"} value={data?.ps_name}></OneItemBox>
        <OneItemBox label={"ကာလ"} value={`${data?.ps_start} ~ ${data?.ps_end}`}></OneItemBox>
        <OneItemBox label={"အလယ်တန်းကျောင်း"} value={data?.ms_name}></OneItemBox>
        <OneItemBox label={"ကာလ"} value={`${data?.ms_start} ~ ${data?.ms_end}`}></OneItemBox>
        <OneItemBox label={"အထက်တန်းကျောင်း"} value={data?.hs_name}></OneItemBox>
        <OneItemBox label={"ကာလ"} value={`${data?.hs_start} ~ ${data?.hs_end}`}></OneItemBox>
        <Divider sx={{  mt: 3 }}>STEP-5</Divider>
        <OneItemBox label={"တက္ကသိုလ်အမည်"} value={data?.uni_name}></OneItemBox>
        {
          data?.is_graduated === "ဘွဲ့ရ" ?
          <TwoItemsBox
            label1="ဘွဲ့ရ/ကျောင်းနား"
            value1={data?.is_graduated}
            label2="မေဂျာ"
            value2={data?.major}
          />
          :
          <TwoItemsBox
            label1="မေဂျာ"
            value1={data?.major}
            label2="နောက်ဆုံးတက်ရောက်ခဲ့သောနှစ်"
            value2={data?.last_attended_year}
          />
        }
        <OneItemBox label={"ကာလ"} value={`${data?.uni_start} ~ ${data?.uni_end}`}></OneItemBox>
        <Divider sx={{  mt: 3 }}>STEP-6</Divider>
        <EduList listItems={data?.other_edu_data}></EduList>
        <Divider sx={{  mt: 3 }}>STEP-7</Divider>
        <JobsList listItems={data?.work_exp_data}></JobsList>
        <Divider sx={{  mt: 3 }}>STEP-8</Divider>
        <FamilyMembersList listItems={data?.family_data}></FamilyMembersList>
        <Divider sx={{  mt: 3   }}>STEP-9</Divider>
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

export default ConfirmForSubmit;
