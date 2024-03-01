import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../slices/backOffice/companySlice';
import { getOrganizations } from '../../slices/backOffice/organizationSlice';
import { useLocation } from 'react-router-dom';

const CustomDropdown = ({ type, setSelectedId, label, error, size }) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const path = location.pathname
  const organizations = useSelector((state) => state.Organization.orgs);
  const companies = useSelector((state) => state.Company.coms);
  const [dropdownItems, setDropdownItems] = useState([]);
  const fetchData = async () => {
    if (type === 'company') {
      await dispatch(getAllCompanies());
    } else {
      await dispatch(getOrganizations());
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, type]);

  useEffect(() => {
    if (type === 'company' && companies) {
      setDropdownItems(
        companies.data.map((item) => ({
          id: item.id,
          label: item.name_eng,
        }))
      );
    }else if(type === 'organization' && organizations){
      setDropdownItems(
        organizations.data.map((item) => ({
          id: item.id,
          label: item.name_eng,
        }))
      );
    }else if(type === 'visa'){
      setDropdownItems([
        { label: 'TIT', id: 1 },
        { label: 'SSW', id: 2 },
        { label: 'SW', id: 3 }
      ])
    }
  }, [companies,organizations]);

  const handleSelect = (selectedItem) => {
    if(selectedItem){
      setSelectedId(selectedItem.id);
    }else if(path.includes('interview-groups') && selectedItem === null){
      setSelectedId(null)
    } 
  };

  return (
    <Autocomplete
      size={size}
      disablePortal
      id={`combo-box-${type}`}
      options={dropdownItems}
      getOptionLabel={(option) => option?.label || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, newValue) => handleSelect(newValue)}
      renderInput={(params) => <TextField {...params} label={label} error={!!error} helperText={error?.message} />}
    />
  );
};

export default CustomDropdown;
