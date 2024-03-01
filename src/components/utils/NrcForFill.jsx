import React, { useEffect, useState } from "react";
import * as nrc from "mm-nrc";
import { Autocomplete, Box,Paper, TextField } from "@mui/material";

const NrcForFill = ({ data, setData, error}) => {
  const [states, setStates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [townships, setTownships] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [nrcNo, setNrcNo] = useState(null);

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
      setSelectedType(null)
      setNrcNo('')
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

  const ReducedHeightPaper = (props) => (
    <Paper {...props} style={{ maxHeight: '200px', overflowY: 'hidden' }} />
  );

  useEffect(() => {
    getTownships(nrc.getNrcTownshipsByStateId(selectedId));
  }, [selectedId]);

  useEffect(()=>{
    if(selectedState && selectedTownship && selectedType && (nrcNo && nrcNo.length === 6)){
      setData(`${selectedState}/${selectedTownship}(${selectedType})${nrcNo}`)
    }
  },[selectedState, selectedTownship, selectedType, nrcNo])

  useEffect(()=>{
    if(data){
      const { nrcNumber, stateNo, townshipCode, nrcType} = nrc.splitNrc(data)
      setSelectedState(stateNo)
      setSelectedTownship(townshipCode)
      setSelectedType(nrcType)
      setNrcNo(nrcNumber)
    }
  },[data])

  useEffect(() => {
    // setSelectedState(null)
    // setSelectedTownship(null)
    // setSelectedType(null)
    // setNrcNo(null)
    getNrcStates();
    getNrcTypes();
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2}}>
        <Box sx={{ width: '50%', display: 'flex', alignItems: 'start', gap: 2 }}>
          <Autocomplete
          sx={{ width: "30%" }}
          disablePortal
          id="combo-box-demo"
          options={states}
          value={selectedState}
          PaperComponent={ReducedHeightPaper} 
          onChange={(event, newValue) => {
              setSelectedState(newValue);
              handleSelect(newValue);
              setSelectedTownship(null)
          }}
          renderInput={(params) => (
              <TextField  
                  label="State"
                  error={!!error}
                  {...params}
                  helperText={error?.message}
              />
          )}
          />
          <Autocomplete
          sx={{ width: "70%" }}
          disablePortal
          id="combo-box-demo-townships"
          options={townships}
          value={selectedTownship}
          PaperComponent={ReducedHeightPaper} 
          onChange={(event, newValue) => {
              handleTownshipSelect(newValue);
          }}
          renderInput={(params) => (
              <TextField
              {...params}
              label="Township"
              error={!!error}
              helperText={error?.message}
              />
          )}
          />
        </Box>
        <Box sx={{ width: '50%', display: 'flex', alignItems: 'start', gap: 2 }}>
          <Autocomplete
            sx={{ width: '40%' }}
            disablePortal
            id="combo-box-demo-type"
            options={types}
            value={selectedType}
            PaperComponent={ReducedHeightPaper} 
            onChange={(event, newValue) => {
                handleTypeSelect(newValue);
            }}
            renderInput={(params) => (
                <TextField
                {...params}
                label="NRC Type"
                error={!!error}
                helperText={error?.message}
                />
            )}
          />
          <TextField
              type="number"
              value={nrcNo || ""}
              sx={{ width: '60%' }}
              onChange={(e) => {
                  setNrcNo(e.target.value);
              }}
              error={!!error}
              label="NRC Number"
              helperText={error?.message}
          />
        </Box>
    </Box>
  );
};

export default NrcForFill;
