import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

const AppPagination = ({ pageCount,currentPage }) => {
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', value);
    searchParams.delete('keyword');
    searchParams.delete('company_id');
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Pagination
      onChange={handleChange}
      sx={{ py: 3, display: 'flex', justifyContent: 'center' }}
      page={currentPage}
      count={pageCount}
      color="primary"
    />
  );
};

export default AppPagination;
