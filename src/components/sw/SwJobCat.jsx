import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react'

const categories = [
    { mm: "သူနာပြုစောင့်ရှောက်မှုလုပ်ငန်း", eng: "Nursing care", jp: "介護"},
    { mm: "အဆောက်အဦးသန့်ရှင်းရေးလုပ်ငန်း", eng: "Building cleaning", jp: "ビルクリーニング"},
    { mm: "စက်အစိတ်အပိုင်းနှင့် စက်ကိရိယာလုပ်ငန်းများ (သတ္တုလုပ်ငန်း)", eng: "Machine parts and tooling", jp: "素形材産業"},
    { mm: "စက်မှုစက်ရုံလုပ်ငန်း", eng: "Industrial machinery", jp: "産業機械製造業"},
    { mm: "လျှပ်စစ်၊ အီလက်ထရောနစ်နှင့် သတင်းအချက်အလက်လုပ်ငန်း", eng: "Electric, electronics and information industries", jp: "電気電子情報関連産業"},
    { mm: "ဆောက်လုပ်ရေးလုပ်ငန်း", eng: "Construction industry", jp: "建設業"},
    { mm: "သင်္ဘော‌ဆောက်ခြင်းနှင့် သင်္ဘောစက်ရုံလုပ်ငန်း", eng: "Shipbuilding and ship machinery industries", jp: "造船・舶用業"},
    { mm: "ကားပြုပြင်ထိန်းသိမ်းရေးလုပ်ငန်း", eng: "Automobile repair and maintenance", jp: "自動車整備業"},
    { mm: "လေကြောင်းလုပ်ငန်း", eng: "Aviation industry", jp: "航空業"},
    { mm: "ဟိုတယ်လုပ်ငန်း", eng: "Accommodation industry", jp: "宿泊業"},
    { mm: "စိုက်ပျိုးရေးလုပ်ငန်း", eng: "Agriculture", jp: "農業"},
    { mm: "ရေလုပ်ငန်း", eng: "Fishery & aquaculture", jp: "漁業"},
    { mm: "စားသောက်ကုန်ထုတ်လုပ်မှုလုပ်ငန်း", eng: "Manufacture of food and beverages", jp: "飲食料品製造業"},
    { mm: "အစားအသောက်ဝန်ဆောင်မှုလုပ်ငန်း", eng: "Food service Industry", jp: "外食業"},
]

const SwJobCat = ({ eng, mm, jp, setEng, setMm, setJp }) => {
    const handleSelect = (event, newValue) => {
      if (newValue) {
        setEng(newValue.eng || eng || "");
        setMm(newValue.mm || mm || "");
        setJp(newValue.jp || jp || "");
      }
    };
  
    const getOptionLabel = (option) => {
      return option && typeof option.eng === 'string' ? option.eng : '';
    };
  
    const isValidValue = (value) => {
      return categories.some((option) => option.eng === value.eng);
    };
  
    const initialValue = isValidValue({ mm: mm, eng: eng, jp: jp }) ? { mm: mm, eng: eng, jp: jp } : null;
  
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => option.eng === value.eng}
        value={initialValue}
        onChange={handleSelect}
        renderInput={(params) => <TextField {...params} label="Job Categories" />}
      />
    );
  };
  
  export default SwJobCat;
  