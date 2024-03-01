import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';

const BloodType = ({val,setVal,errors, label}) => {

    const bloodTypes = [
        "A",
        "B",
        "AB",
        "O",
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-",
      ];
    
    const [ btValue,setBtValue ] = useState(val)

    const handleBloodTypeChange = (event, newValue) => {
        setBtValue(newValue);
        setVal(newValue)
    };

    useEffect(()=>{
        setBtValue(val)
    },[val])

  return (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={bloodTypes}
              sx={{ width: "100%" }}
              value={btValue}
              onChange={handleBloodTypeChange}
              renderInput={(params) => (
                <TextField
                  error={!!errors.blood_type}
                  helperText={errors?.blood_type && errors.blood_type?.message}
                  {...params}
                  label={label}
                ></TextField>
              )}
            />
  )
}

export default BloodType