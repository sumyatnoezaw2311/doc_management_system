import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../utils/theme'

const ExpList = ({ listItems, getExperiences }) => {
  const path = useLocation().pathname;
  const [openItems, setOpenItems] = useState([]);
  const [items, setItems] = useState([]);

  const handleDelete = (id) => {
    const afterDeleted = items.filter((item) => item.id !== id);
    setItems(afterDeleted);
    getExperiences(afterDeleted);
  };

  useEffect(() => {
    if (listItems.length > 0) {
      setItems(listItems);
      // Initialize the open state for each item to false
      setOpenItems(new Array(listItems.length).fill(false));
    }
  }, [listItems]);

  const toggleOpen = (index) => {
    // Create a copy of the openItems array and toggle the state at the specified index
    const updatedOpenItems = [...openItems];
    updatedOpenItems[index] = !updatedOpenItems[index];
    setOpenItems(updatedOpenItems);
  };

  return (
    items.length === 0 ? (
      <Alert severity="warning">No Experiences yet</Alert>
    ) : (
      <TableContainer elevation={0} component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell sx={{ border: 0 }}>
                    <IconButton onClick={() => toggleOpen(index)}>
                      {openItems[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ border: 0, p: 0 }}>{item.position}</TableCell>
                  <TableCell sx={{ border: 0, p: 0 }}>
                    {item.start} ~
                    <br></br>
                    {item.end}
                  </TableCell>
                  <TableCell sx={{ border: 0, p: 0 }}>
                    {!path.includes('/confirmation') && (
                      <IconButton onClick={() => handleDelete(item.id)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0, p: 0 }}>
                  <TableCell sx={{ border: 0, p: 0 }} />
                  <TableCell sx={{ border: 0, p: 0 }} colSpan={3}>
                    <Collapse sx={{ flexWrap: 'nowrap' }} in={openItems[index]} timeout="auto" unmountOnExit>
                      Company Name <Typography sx={{ color: theme.palette.dark.main , fontSize: '12px' }}>{item.company}</Typography>
                    </Collapse>
                    <Collapse sx={{ flexWrap: 'nowrap' }} in={openItems[index]} timeout="auto" unmountOnExit>
                      Job Category <Typography sx={{ color: theme.palette.dark.main , fontSize: '12px' }}>{item.business_type}</Typography>
                    </Collapse>
                    <Collapse sx={{ flexWrap: 'nowrap' }} in={openItems[index]} timeout="auto" unmountOnExit>
                      Responsibilities <Typography sx={{ color: theme.palette.dark.main , fontSize: '12px' }}>{item.responsibilities}</Typography>
                    </Collapse>
                    <Collapse sx={{ flexWrap: 'nowrap', pb: 2 }} in={openItems[index]} timeout="auto" unmountOnExit>
                      Reason for leaving <Typography sx={{ color: theme.palette.dark.main , fontSize: '12px' }}>{item.reason_for_leaving}</Typography>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default ExpList;
