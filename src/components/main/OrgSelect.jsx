import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const OrgSelect = ({ getId, error }) => {
  
  const getOrgData = (state) => state.Organization.orgs?.data || [];

  const getOrgDropdownItems = getOrgData.length > 0 && createSelector([getOrgData], (orgData) => {
      return orgData.map((item) => ({
          id: item.id,
          label: item.name_eng,
      }));
  });

  const orgDropdownItems = useSelector(getOrgDropdownItems);

  const handleOnChange = (val)=>{
    getId(val.id);
  }

  return (
    <Autocomplete
      disablePortal
      id={`combo-box-org`}
      options={orgDropdownItems}
      getOptionLabel={(option) => option?.label || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, newValue) => {
        handleOnChange(newValue)
      }}
      renderInput={(params) => <TextField {...params} error={!!error} helperText={error?.message} />}
    />
  );
};

export default OrgSelect;
