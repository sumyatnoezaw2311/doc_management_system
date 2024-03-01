import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Date from '../../../components/main/Date';
import CustomDropdown from '../../../components/utils/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { createCollection, createIntGroup } from '../../../slices/backOffice/interviewGpSlice';
import { useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../../slices/backOffice/companySlice';
import Loading from '../../../components/utils/Loading';

const createGpSchema = Yup.object().shape({
  name: Yup.string().required("Group name is required"),
  interview_date: Yup.string().required("Interview date is required"),
  type: Yup.number().required("Please choose the type of group"),
  // org_id: Yup.number().required("Please choose the organization"),
  company_id: Yup.number().required("Please choose the company")
})

const CreateDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(open);
    const [ intDate,setIntDate ] = React.useState(null)
    const [ selectedOrgId,setSelectedOrgId ] = React.useState(null)
    const [ selectedComId,setSelectedComId ] = React.useState(null)
    const collectedUser = useSelector(state=> state.IntGroup.collection)
    const [ selectedType,setSelectedType ] = React.useState(null)
    const loading = useSelector(state=> state.IntGroup.loading)
    const singleComLoading = useSelector(state=> state.Company.loading)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(createGpSchema),
    });

  const handleClose = () => {
    setIsOpen(false);
    setOpen(false);
  };

  const handleCreate = async (data) => {
    if(collectedUser){
      const createData = {...data, member_data: collectedUser, org_id: selectedOrgId }
      await dispatch(createIntGroup(createData));
      navigate("/back-office/interview-groups")
      dispatch(createCollection([]))
    }
  };

  const getComData = async (comId)=>{
    const fetchComById = await dispatch(getCompanyById(comId))
    setSelectedOrgId(Number(fetchComById.payload.data.organization_id));
  }
  
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  React.useEffect(()=>{
    intDate && setValue('interview_date', intDate)
    // selectedOrgId && setValue('org_id', Number(selectedOrgId))
   
  },[intDate])

  React.useEffect(()=>{
    if(selectedComId){
      getComData(selectedComId);
      setValue('company_id', Number(selectedComId))
    }
  },[selectedComId])

  React.useEffect(()=>{
    selectedType && setValue('type', Number(selectedType))
  },[selectedType])

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          (loading || singleComLoading) && <Loading/>
        }
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>{"Create Interview Group"}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(handleCreate)} autoComplete='off'>
                <Box sx={{ pt: 2 }}>
                  <TextField {...register('name')} fullWidth label={'Group Name'} sx={{ mb: 2 }} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                </Box>
                <Date dateVal={intDate} setDate={setIntDate} error={errors?.interview_date}></Date>
                {/* <Box sx={{ my: 2 }}>
                  <CustomDropdown error={errors?.org_id} type="organization" setSelectedId={setSelectedOrgId} label="Organization" />
                </Box> */}
                <Box sx={{ my: 2 }}>
                  <CustomDropdown error={errors?.company_id} type="company" setSelectedId={setSelectedComId} label="Company" />
                </Box>
                <Box sx={{ my: 2 }}>
                  <CustomDropdown error={errors?.type} type="visa" setSelectedId={setSelectedType} label="Group Type" />
                </Box>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button type='button' onClick={handleClose}>Cancel</Button>
                  <Button type='submit' sx={{ ml: 2 }} autoFocus>
                    Create
                  </Button>
                </Box>
            </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateDialog;
