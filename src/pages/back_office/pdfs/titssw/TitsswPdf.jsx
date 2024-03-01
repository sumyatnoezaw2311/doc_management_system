import React, { useRef, useState, forwardRef, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import '../../../../assets/css/cv.css'
import PersonalInfo1Table from './PersonalInfo1Table';
import PersonalInfo2Table from './PersonalInfo2Table';
import EduTable from './EduTable';
import ExpTable from './ExpTable';
import FamilyTable from './FamilyTable';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import { TextField } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TitsswPdf = ({ isOpen,setIsOpen, cvId })=>{

  const dispatch = useDispatch()
  const [open, setOpen] = useState(isOpen);
  const [ intNo,setIntNo ] = useState(null)
  const cvData = useSelector((state) => state.CvForm.cv);
  const printRef = useRef()
  const handleClose = () => {
    setIsOpen(false);
  };

  const getData = async () => {
    if(cvId){
      await dispatch(getCvById({ type: 'titssw', id: cvId }));
    }
  };

  const handlePrint = useReactToPrint({
    content: ()=> printRef.current,
    documentTitle: Date.now(),
    // onAfterPrint: ()=>{
    //  alert("Successfully printed....") 
    // }
})

  useEffect(()=>{
    setOpen(isOpen)
    getData()
  },[isOpen,cvId])

  return (
    <Fragment>
      {
        cvData &&
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
              <Toolbar sx={{ mb: 3 }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  sx={{ ml: 3 }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  CV From (TIT/SSW)
                </Typography>
                <TextField onChange={(e)=> setIntNo(e.target.value)} sx={{ mr: 5 }} autoComplete='off' size='small' placeholder='Enter no'></TextField>
                <Button sx={{ mr: 3 }} startIcon={<PrintIcon/>} autoFocus color="primary" variant='text' onClick={()=> handlePrint() }>
                  Print
                </Button>
              </Toolbar>
              <div
                  ref={printRef}
                  style={{
                      width: { xs: '100%', lg: '100%' },
                      height: '100%',
                      // padding: '50px',
                      '@media print': {
                          width: { xs: '210mm', lg: '210mm' },
                          height: '297mm',
                      },
                  }} className='custom-table-container'>
                  <table className='custom-table'>
                    <tbody>
                      {/* personal info 1 */}
                      <PersonalInfo1Table no={intNo} ></PersonalInfo1Table>
                      <tr>
                        <td style={{ height: '5px' }} colSpan={9}></td>
                      </tr>
                      {/* personal info 2 */}
                      <PersonalInfo2Table></PersonalInfo2Table>
                      <tr>
                        <td style={{ height: '5px' }} colSpan={9}></td>
                      </tr>
                      {/* education section */}
                      <EduTable></EduTable>
                      {/* work experience */}
                      <tr>
                        <td colSpan={9} style={{ fontWeight: "bold", textAlign: 'center', padding: '5px', fontSize: '18px' }}>職歴</td>
                      </tr>
                      <ExpTable></ExpTable>
                      {/* family member */}
                      <tr>
                        <td colSpan={9} style={{ fontWeight: "bold", textAlign: 'center', padding: '5px', fontSize: '18px' }}>家族構成</td>
                      </tr>
                      <FamilyTable></FamilyTable>
                      <tr>
                        <td colSpan={9} style={{ fontWeight: "bold", textAlign: 'center', padding: '5px', fontSize: '18px' }}></td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="custom-cell" style={{ textAlign: 'left', padding: '10px' }}>備考（自己PR）<br/> {cvData.pr}</td>
                      </tr>
                      <tr>
                        <td colSpan={9} style={{ fontWeight: "bold", textAlign: 'center', padding: '5px', fontSize: '18px' }}></td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="custom-cell" style={{ textAlign: 'left', padding: '10px' }}>メモ<br/> {cvData.memo}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
        </Dialog>
      }
    </Fragment>
  );
}


export default TitsswPdf