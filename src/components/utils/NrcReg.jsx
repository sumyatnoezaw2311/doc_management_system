import React, { useEffect, useState } from 'react';
import * as nrc from 'mm-nrc';
import { Autocomplete, Typography, TextField, Box, Paper } from '@mui/material';

const NrcReg = ({ label, value, setValue }) => {
  const [states, setStates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [townships, setTownships] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [nrcNo, setNrcNo] = useState('');

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
      const selectedState = nrc.getNrcStates().find((each) => each.number.en === value);
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

  useEffect(() => {
    getTownships(nrc.getNrcTownshipsByStateId(selectedId));
  }, [selectedId]);

  useEffect(() => {
    (selectedState && selectedTownship && selectedType && nrcNo.length === 6) && setValue(`${selectedState}/${selectedTownship}(${selectedType})${nrcNo}`);
  }, [nrcNo]);

  useEffect(() => {
    getNrcStates();
    getNrcTypes();
  }, []);

  const ReducedHeightPaper = (props) => (
    <Paper {...props} style={{ maxHeight: '200px', overflowY: 'hidden' }} />
  );

  return (
    <>
      <Typography variant='body2' sx={{ pb: 1 }}>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Autocomplete
          sx={{ width: '50%' }}
          disablePortal
          id="combo-box-demo"
          options={states}
          value={selectedState}
          PaperComponent={ReducedHeightPaper} 
          onChange={(event, newValue) => handleSelect(newValue)}
          renderInput={(params) => <TextField {...params} label="State" />}
        />
        <Autocomplete
          sx={{ width: '50%' }}
          disablePortal
          id="combo-box-demo-townships"
          options={townships}
          value={selectedTownship}
          PaperComponent={ReducedHeightPaper} 
          onChange={(event, newValue) => handleTownshipSelect(newValue)}
          renderInput={(params) => <TextField {...params} label="Township" />}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Autocomplete
          sx={{ width: '50%' }}
          disablePortal
          id="combo-box-demo-townships"
          options={types}
          value={selectedType}
          PaperComponent={ReducedHeightPaper} 
          onChange={(event, newValue) => handleTypeSelect(newValue)}
          renderInput={(params) => <TextField {...params} label="Type" />}
        />
        <TextField
          type="text"
          sx={{ width: '50%' }}
          onChange={(e) => {
            setNrcNo(e.target.value);
          }}
          label="NRC No"
        />
      </Box>
    </>
  );
};

export default NrcReg;


