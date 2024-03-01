import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const SearchInput = () => {

  const navigate = useNavigate()
  const [ keyword,setKeyword ] = useState("")

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const reset = ()=>{
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('page')
    searchParams.delete('keyword');
    searchParams.delete('company_id');
    navigate(``)
    window.location.reload()
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('page')
    searchParams.set('keyword', keyword);
    // const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    // window.history.replaceState({}, '', newUrl);
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        size='small'
        fullWidth
        placeholder="Search"
        variant="outlined"
        value={keyword}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch} variant='contained' sx={{ ml: 1, color: '#fff' }}>
        <SearchIcon/>
      </Button>
      <Button onClick={reset} variant='outlined' sx={{ ml: 1 }}>
        <RestartAltIcon/>
      </Button>
    </Box>
  );
};

export default SearchInput;
