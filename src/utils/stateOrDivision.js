export const stateOrDivision = (val)=>{
    let newVal = ""
    if(val === 'Mandalay Division'){
      newVal = "မန္တလေးတိုင်းဒေသကြီး"
    }else if(val === 'Yangon Division'){
      newVal = "ရန်ကုန်တိုင်းဒေသကြီး"
    }else if(val === 'Sagaing Division'){
      newVal = "စစ်ကိုင်းတိုင်းဒေသကြီး"
    }else if(val === 'Tanintharyi Division'){
      newVal = "တနင်္သာရီတိုင်းဒေသကြီး"
    }else if(val === 'Bago Division'){
      newVal = "ပဲခူးတိုင်းဒေသကြီး"
    }else if(val === 'Magway Division'){
      newVal = "မကွေးတိုင်းဒေသကြီး"
    }else if(val === 'Ayeyaway Division'){
      newVal = "ဧရာ၀တီတိုင်းဒေသကြီး"
    }else if(val === 'Naypyitaw Division'){
      newVal = "နေပြည်တော်တိုင်းဒေသကြီး"
    }else if(val === 'Kachin State'){
      newVal = "ကချင်ပြည်နယ်"
    }else if(val === 'Kayin State'){
      newVal = "ကရင်ပြည်နယ်"
    }else if(val === 'Kayah State'){
      newVal = "ကယားပြည်နယ်"
    }else if(val === 'Chin State'){
      newVal = "ချင်းပြည်နယ်"
    }else if(val === 'Mon State'){
      newVal = "မွန်ပြည်နယ်"
    }else if(val === 'Rakhine State'){
      newVal = "ရခိုင်ပြည်နယ်"
    }else if(val === 'Shan State'){
      newVal = "ချင်းပြည်နယ်"
    }
    return newVal;
  }