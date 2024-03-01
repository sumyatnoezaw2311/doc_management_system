import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../../../utils/theme';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../../slices/backOffice/interviewGpSlice';
import FormDatePicker from '../../../components/main/DatePicker';
import { createDeparture, updateDeparture } from '../../../slices/backOffice/documentSlice';
import Loading from '../../../components/utils/Loading';

const createDepartureSchema = Yup.object().shape({
    departure_date: Yup.string().required("Departure date is required"),
})

const Departure = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = React.useState(isOpen);
    const createLoading = useSelector(state=> state.Document.loading)
    const currentGroup = useSelector(state=> state.IntGroup.group)
    const [date, setDate] = React.useState(null);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(createDepartureSchema),
    });

    const handleClose = () => {
        reset();
        setDate(null);
        setOpen(false);
        setIsOpen(false);
    };

    const handleOnSubmit = async (data) => {
        (currentGroup && currentGroup.data.departure_date) ? await dispatch(updateDeparture({ data, gpId: id})) : await dispatch(createDeparture({ data, gpId: id }));
        await dispatch(getGroupById(id));
        handleClose();
    };

    React.useEffect(()=>{
        date && setValue('departure_date', date)
    },[date])

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    React.useEffect(()=>{
        if(currentGroup && currentGroup.data.departure_date){
            setValue('date', currentGroup.data.departure_date)
            setDate(currentGroup.data.departure_date)
        }
    },[currentGroup,isOpen])

    return (
        <React.Fragment>
            {
                createLoading && <Loading/>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Departure Date</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <DialogContentText id="alert-dialog-description" sx={{ mb: 1 }}>
                        Fill the date of departure.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <FormDatePicker
                            placeholderText="Departure Date"
                            dateVal={date}
                            setDate={setDate}
                            error={errors?.departure_date}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 2 }}>
                            <Button type="button" onClick={handleClose} sx={{ color: theme.palette.common.black }}>
                                Cancel
                            </Button>
                            <Button type="submit" autoFocus sx={{ ml: 2 }}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default Departure;
