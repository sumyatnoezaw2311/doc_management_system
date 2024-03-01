import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import '../../../../assets/css/cv.css'
import PersonalInfo from './PersonalInfo';
import EduTable from './EduTable';
import SkillTable from './SkillTable';
import ExpTable from './ExpTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SwPdf = ({ isOpen,setIsOpen, cvId })=>{

  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(isOpen);
  const cvData = useSelector((state) => state.CvForm.cv);
  const printRef = useRef()

  const handleClose = () => {
    setIsOpen(false);
  };

  const getData = async () => {
    if(cvId){
      await dispatch(getCvById({ type: 'sw', id: cvId }));
    }
  };

  const handlePrint = useReactToPrint({
    content: ()=> printRef.current,
    documentTitle: Date.now(),
    // onAfterPrint: ()=>{
    //  alert("Successfully printed....") 
    // }
})

  React.useEffect(()=>{
    setOpen(isOpen)
    getData()
  },[isOpen,cvId])

  return (
    <React.Fragment>
      {
        cvData &&
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
              <Toolbar>
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
                  CV From (SW)
                </Typography>
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
                  }}>
                  <div className='custom-table-container'>
                    <table className='custom-table'>
                      <tbody>
                        <PersonalInfo></PersonalInfo>
                        <EduTable></EduTable>
                        <SkillTable></SkillTable>
                        <ExpTable></ExpTable>
                      </tbody>
                    </table>
                  </div>
              </div>
        </Dialog>
      }
    </React.Fragment>
  );
}


export default SwPdf