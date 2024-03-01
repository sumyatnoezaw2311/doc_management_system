import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../../../utils/theme'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../../slices/backOffice/interviewGpSlice';
import FormDatePicker from '../../../components/main/DatePicker';
import { createPredeparture, updatePredeparture } from '../../../slices/backOffice/documentSlice';
import Loading from '../../../components/utils/Loading';

const predepSchema = Yup.object().shape({
    date: Yup.string().required("Predeparture date is required"),
    course_start_date: Yup.string().required("2 Days course start date is required"),
    course_end_date: Yup.string().required("2 Days course end date is required"),
    certificate_issue_date: Yup.string().required("Certificate issue date is required")
})

const CreatePredep = ({isOpen,setIsOpen})=>{

  const dispatch = useDispatch()
  const { id } = useParams()
  const [open, setOpen] = React.useState(isOpen);
  const [ date, setDate ] = React.useState(null)
  const [ startDate,setStartDate ] = React.useState(null)
  const [ endDate,setEndDate ] =  React.useState(null)
  const [ issueDate,setIssueDate ] = React.useState(null)
  const createLoading = useSelector(state=> state.Document.loading)
  const currentGroup = useSelector(state=> state.IntGroup.group)

  const {
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(predepSchema),
    });

    const handleClose = () => {
        reset()
        setDate(null)
        setOpen(false);
        setIsOpen(false)
    };

    const handleOnSubmit = async (data)=>{
        (currentGroup && currentGroup?.data?.predeparture?.date) ? await dispatch(updatePredeparture({ data: data, gpId: id})) : await dispatch(createPredeparture({ data: data, gpId: id}));
        await dispatch(getGroupById(id))
        handleClose()
    }

    React.useEffect(()=>{
        date && setValue('date', date)
        startDate && setValue('course_start_date', startDate)
        endDate && setValue('course_end_date', endDate)
        issueDate && setValue('certificate_issue_date', issueDate)
    },[date, startDate, endDate, issueDate])

    React.useEffect(()=>{
        setOpen(isOpen)
    },[isOpen])

    React.useEffect(()=>{
        if(currentGroup && currentGroup?.data?.predeparture?.date){
            setValue('date', currentGroup.data.predeparture.date)
            setValue('course_start_date', currentGroup.data.predeparture.course_start_date)
            setValue('course_end_date', currentGroup.data.predeparture.course_end_date)
            setValue('certificate_issue_date', currentGroup.data.predeparture.certificate_issue_date)
            setDate(currentGroup.data.predeparture.date)
            setStartDate(currentGroup.data.predeparture.course_start_date)
            setEndDate(currentGroup.data.predeparture.course_end_date)
            setIssueDate(currentGroup.data.predeparture.certificate_issue_date)
        }
    },[currentGroup,isOpen])


  return (
    <React.Fragment >
        {
            createLoading && <Loading/>
        }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle id="alert-dialog-title">
                Predeparture
            </DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                    Fill the date to create predeparture document.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Box sx={{ height: 12 }}></Box>
                    <FormDatePicker placeholderText={"Predeparture Date"} dateVal={date} setDate={setDate} error={errors?.date}/>
                    <Box sx={{ height: 12 }}></Box>
                    <FormDatePicker placeholderText={"2 days course start date"} dateVal={startDate} setDate={setStartDate} error={errors?.course_start_date}/>
                    <Box sx={{ height: 12 }}></Box>
                    <FormDatePicker placeholderText={"2 days course end date"} dateVal={endDate} setDate={setEndDate} error={errors?.course_end_date}/>
                    <Box sx={{ height: 12 }}></Box>
                    <FormDatePicker placeholderText={"Certificate Issue Date"} dateVal={issueDate} setDate={setIssueDate} error={errors?.certificate_issue_date}/>
                    {/* <Box sx={{ height: 10 }}></Box> */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 2 }}>
                        <Button type='button' onClick={handleClose} sx={{ color: theme.palette.common.black }}>Cancel</Button>
                        <Button type='submit' autoFocus sx={{ ml: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CreatePredep