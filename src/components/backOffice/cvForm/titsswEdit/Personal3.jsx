import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateCvForm } from '../../../../slices/backOffice/updateTitsswslice';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';


const threeSchema = Yup.object().shape({
    hometown: Yup.string().required("Hometown is required"),
    left_right_handed: Yup.string().required("Select left or right handed"),
    bicycle: Yup.string().required("Select can ride or not"),
    marriage_status: Yup.string().required("Select marriage status"),
    group_live: Yup.string().required("Select group live"),
    surgery: Yup.string().required("Select surgery status"),
    betal: Yup.boolean(),
    cigrette: Yup.boolean(),
    tattoo: Yup.boolean(),
    alcohol: Yup.boolean(),
});

const Personal3 = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const [isOpen, setIsOpen] = useState(open);
  const [ handed,setHanded ] = useState("ဘယ်")
  const [ canRide,setCanRide ] = useState("စီးတတ်")
  const [ marriage,setMarriage ] = useState("ရှိ")
  const [ groupLive,setGroupLive ] = useState("ရှိ")
  const [ surgery,setSurgery ] = useState("ရှိ")

  
  const [checkboxValues, setCheckboxValues] = useState({
    betal: false,
    cigrette: false,
    alcohol: false,
    tattoo: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(threeSchema),
  });

  const handleChecks = (name) => (event) => {
    const { checked } = event.target;
    setCheckboxValues({ ...checkboxValues, [name]: checked });
    setValue(name, checked);
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      hometown: data.hometown,
      betal: data.betal === true ? 1 : 0,
      cigrette: data.cigrette === true ? 1 : 0,
      alcohol: data.alcohol === true ? 1 : 0,
      tattoo: data.tattoo === true ? 1 : 0,
      left_right_handed: data.left_right_handed,
      bicycle: data.bicycle,
      marriage_status: data.marriage_status,
      group_live: data.group_live,
      surgery: data.surgery
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if(oldDataFromState){
        setValue('hometown', oldDataFromState.hometown);
        setValue('left_right_handed', oldDataFromState.left_right_handed);
        setValue('bicycle', oldDataFromState.bicycle);
        setValue('marriage_status', oldDataFromState.marriage_status);
        setValue('group_live', oldDataFromState.group_live);
        setValue('surgery', oldDataFromState.surgery)
        setCheckboxValues({
            betal: oldDataFromState.betal === "1" ? true : false,
            cigrette: oldDataFromState.cigrette === "1" ? true : false,
            alcohol: oldDataFromState.alcohol === "1" ? true : false,
            tattoo: oldDataFromState.tattoo === "1" ? true : false,
        });
        setHanded(oldDataFromState.left_right_handed)
        setCanRide(oldDataFromState.bicycle)
        setMarriage(oldDataFromState.marriage_status)
        setGroupLive(oldDataFromState.group_live)
        setSurgery(oldDataFromState.surgery)
    }
  }, [isOpen]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit CV Data</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Box sx={{ pt: 1 }}>
              <TextField
                {...register('hometown')}
                fullWidth
                label={'Hometown'}
                sx={{ mb: 2 }}
                error={!!errors.hometown}
                helperText={errors?.hometown?.message}
              />
            <Typography>ကြိုက်နှစ်သက်သောအရာ</Typography>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                }}
            >
                 {['betal', 'cigrette', 'alcohol', 'tattoo'].map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        {...register(name)}
                        name={name}
                        checked={checkboxValues[name]}
                        onChange={handleChecks(name)}
                      />
                    }
                    label={
                      <Typography variant="p" sx={{ fontSize: '15px' }}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                    }
                  />
                ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '50%', py: 2 }}>
                <FormControl fullWidth error={!!errors?.left_right_handed}>
                    <InputLabel id="demo-simple-select-label">Left / Right handed</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={handed}
                      label="Left/Right Handed"
                      onChange={(e) => {
                        setHanded(e.target.value);
                        setValue('left_right_handed', e.target.value);
                      }}
                    >
                      <MenuItem value={'ဘယ်'}>左</MenuItem>
                      <MenuItem value={'ညာ'}>右</MenuItem>
                    </Select>
                    {errors?.left_right_handed && <FormHelperText>Please select an option</FormHelperText>}
                  </FormControl>
                </Box>               
                <Box sx={{ width: '50%', py: 2 }}>
                  <FormControl fullWidth error={!!errors?.bicycle}>
                    <InputLabel id="demo-simple-select-label">Bicycle</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={canRide}
                        label="Bicycle"
                        onChange={(e) => {
                            setCanRide(e.target.value);
                            setValue('bicycle', e.target.value);
                        }}
                        >
                        <MenuItem value={'စီးတတ်'}>可</MenuItem>
                        <MenuItem value={'မစီးတတ်'}>不可</MenuItem>
                    </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '50%', py: 2 }}>
                    <FormControl fullWidth error={!!errors?.marriage_status}>
                    <InputLabel id="demo-simple-select-label">Marriage status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={marriage}
                      label="Marriage Status"
                      onChange={(e) => {
                        setMarriage(e.target.value);
                        setValue('marriage_status', e.target.value);
                      }}
                    >
                      <MenuItem value={'ရှိ'}>既婚</MenuItem>
                      <MenuItem value={'မရှိ'}>未婚</MenuItem>
                    </Select>
                    {errors?.marriage_status && <FormHelperText>Please select an option</FormHelperText>}
                    </FormControl>
                </Box>
                <Box sx={{ width: '50%', py: 2 }}>
                  <FormControl fullWidth error={!!errors?.group_live}>
                    <InputLabel id="demo-simple-select-label">Group Live</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupLive}
                      label="Group Live"
                      onChange={(e) => {
                        setGroupLive(e.target.value);
                        setValue('group_live', e.target.value);
                      }}
                    >
                      <MenuItem value={'ရှိ'}>有</MenuItem>
                      <MenuItem value={'မရှိ'}>無</MenuItem>
                    </Select>
                    {errors?.group_live && <FormHelperText>Please select an option</FormHelperText>}
                  </FormControl>
                </Box>
            </Box>
                <Box sx={{ width: '100%', py: 2 }}>
                  <FormControl fullWidth error={!!errors?.surgery}>
                    <InputLabel id="demo-simple-select-label">Surgery</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={surgery}
                      label="Surgery"
                      onChange={(e) => {
                        setSurgery(e.target.value);
                        setValue('surgery', e.target.value);
                      }}
                    >
                      <MenuItem value={'ရှိ'}>有</MenuItem>
                      <MenuItem value={'မရှိ'}>無</MenuItem>
                    </Select>
                    {errors?.surgery && <FormHelperText>Please select an option</FormHelperText>}
                  </FormControl>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" sx={{ ml: 2 }} autoFocus>
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Personal3;
