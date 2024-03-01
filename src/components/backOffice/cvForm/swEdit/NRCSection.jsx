import React, { useEffect, useState } from "react";
import * as nrc from "mm-nrc";
import { Autocomplete, Box, Button, Divider, Fab, Paper, TextField } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { mmToEng } from "../../../../utils/mmToEng";
import { pattern } from 'mm-nrc';

const nrcSchema = Yup.object().shape({
    state: Yup.string().required(),
    township: Yup.string().required(),
    type: Yup.string().required(),
    nrc_no: Yup.string().matches(/^[0-9]{6}$/, 'NRC No must be a string with exactly 6 digits').required(),
  });

const NRCSection = ({data,setData,setStatus,edit}) => {
  const [states, setStates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [townships, setTownships] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [nrcNo, setNrcNo] = useState(null);
  const mmNrcPattern = pattern.mm;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(nrcSchema),
  });

  const getNrcStates = () => {
    const statesFromNrc = nrc.getNrcStates().map((nrc) => `${nrc.number.en}`);
    setStates(statesFromNrc);
  };

  const getNrcTypes = () => {
    const typeNames = nrc.getNrcTypes().map((type) => type.name.en);
    setTypes(typeNames);
  };

  const getTownships = (data) => {
    const townshipsDataArr = data.map((ts) => ts.short.en);
    setTownships(townshipsDataArr);
  };

  const handleSelect = (value) => {
    if (value === null) {
      setTownships([]);
      setSelectedState(null);
    } else {
      setSelectedState(value);
      const selectedState = nrc
        .getNrcStates()
        .find((each) => each.number.en === value);
      const stateId = selectedState ? selectedState.id : null;
      setSelectedId(stateId);
    }
  };

  const handleTownshipSelect = (value) => {
    setSelectedTownship(value);
  };

  const handleTypeSelect = (value) => {
    setSelectedType(value);
  };

  const handleCreate = (data)=>{
    setData(data)
    setStatus(false)
  }

  const handleCancel = ()=>{
    reset();
    setData(null)
    setSelectedState(null)
    setSelectedTownship(null)
    setSelectedType(null)
  }

  const ReducedHeightPaper = (props) => (
    <Paper {...props} style={{ maxHeight: '200px', overflowY: 'hidden' }} />
  );


  const convertToEnNrc = async (prevNrc)=>{
    const { nrcNumber, townshipCode, nrcType, stateNo } = await nrc.splitNrc(prevNrc)
    const mmNrcTrueFormat = `${stateNo}/${townshipCode}(${nrcType})${mmToEng(nrcNumber)}`
    const enNrcTrueFormat = await nrc.convertToEnNrc(mmNrcTrueFormat)
    const { nrcNumber: newNrcNumber, townshipCode: newTownshipCode , nrcType: newNrcType, stateNo: newStateNo } = await nrc.splitNrc(enNrcTrueFormat);
    setValue('nrc_no', newNrcNumber)
    setValue('township', newTownshipCode)
    setValue('type', newNrcType)
    setValue('state', newStateNo)
    setSelectedState(newStateNo)
    setSelectedTownship(newTownshipCode)
    setSelectedType(newNrcType)
  }

  useEffect(() => {
    getTownships(nrc.getNrcTownshipsByStateId(selectedId));
  }, [selectedId]);

  useEffect(() => {
    getNrcStates();
    getNrcTypes();
    if(data && edit){
      convertToEnNrc(data)
    }else if(data){
        setValue('state', data.state)
        setValue('township',data.township)
        setValue('type', data.type)
        setValue('nrc_no', data.nrc_no)
        setSelectedState(data.state)
        setSelectedTownship(data.township)
        setSelectedType(data.type)
    }
  }, []);

  return (
    <>
        <form onSubmit={handleSubmit(handleCreate)}>
            <Box sx={{ display: "flex", mb: 2 }} gap={2}>
                <Autocomplete
                sx={{ width: "50%" }}
                disablePortal
                id="combo-box-demo"
                options={states}
                value={selectedState}
                PaperComponent={ReducedHeightPaper} 
                onChange={(event, newValue) => {
                    setValue("state", newValue);
                    setSelectedState(newValue);
                    handleSelect(newValue);
                    setSelectedTownship(null)
                }}
                renderInput={(params) => (
                    <TextField
                        label="Select State"
                        error={!!errors?.state}
                        {...params}
                        helperText={errors?.state?.message}
                    />
                )}
                />
                <Autocomplete
                sx={{ width: "50%" }}
                disablePortal
                id="combo-box-demo-townships"
                options={townships}
                value={selectedTownship}
                PaperComponent={ReducedHeightPaper} 
                onChange={(event, newValue) => {
                    setValue("township", newValue);
                    handleTownshipSelect(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Select Township"
                    error={!!errors?.township}
                    helperText={errors?.township?.message}
                    />
                )}
                />
            </Box>
            <Box sx={{ display: "flex", mb: 2 }} gap={2}>
                <Autocomplete
                  sx={{ width: '50%' }}
                  disablePortal
                  id="combo-box-demo-townships"
                  options={types}
                  value={selectedType}
                  PaperComponent={ReducedHeightPaper} 
                  onChange={(event, newValue) => {
                      handleTypeSelect(newValue);
                      setValue("type", newValue);
                  }}
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label="Select NRC Type"
                      error={!!errors?.type}
                      helperText={errors?.type?.message}
                      />
                  )}
                />
                <TextField
                    type="text"
                    sx={{ width: '50%' }}
                    {...register("nrc_no")}
                    onChange={(e) => {
                        setNrcNo(e.target.value);
                        setValue("nrc_no", e.target.value);
                    }}
                    error={!!errors?.nrc_no}
                    label="NRC Number"
                    helperText={errors?.nrc_no?.message}
                  />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2}}>
              <Button type="button" onClick={()=> handleCancel() } variant="outlined" sx={{ mr: 2 }}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </Box>
        </form>
    </>
  );
};

export default NRCSection;
