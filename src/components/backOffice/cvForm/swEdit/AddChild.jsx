import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import NRCSection from "./NRCSection";
import { getNrcData } from "mm-nrc";
import { convertToMyanmarNumbers } from "../../../../utils/enTomm";
import {
  createChild,
  getCvById,
} from "../../../../slices/backOffice/cvFromSlice";
import { useDispatch } from "react-redux";

const childSchema = Yup.object().shape({
  name_mm: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Please enter a valid age")
    .integer("Please enter a valid age")
    .required("Age is required"),
});

const AddChild = ({ open, setOpen, cvId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(open);
  const [addNrc, setAddNrc] = useState(false);
  const [nrcData, setNrcData] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(childSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const changeNrcFormat = async (stateNo, townshipCode, nrcType, nrcNumber) => {
    const filteredState = getNrcData().nrcStates.find(
      (state) => state.number.en === stateNo
    );
    const filteredTownship = getNrcData().nrcTownships.find(
      (township) => township.short.en === townshipCode
    );
    const filteredType = getNrcData().nrcTypes.find(
      (type) => type.name.en === nrcType
    );
    const mmNrcNumber = nrcNumber && convertToMyanmarNumbers(nrcNumber);
    const mmType = filteredType?.name?.mm;
    const mmTownship = filteredTownship?.short?.mm;
    const mmState = filteredState?.number?.mm;
    const mmNrc = `${mmState}/${mmTownship}(${mmType})${mmNrcNumber}`;
    return mmNrc;
  };

  const handleCreate = async (data) => {
    if (nrcData) {
      const nrcMM = await changeNrcFormat(
        nrcData.state,
        nrcData.township,
        nrcData.type,
        nrcData.nrc_no
      );
      dispatch(createChild({ ...data, ...{ nrc_mm: nrcMM, sw_id: cvId } }));
    } else {
      dispatch(createChild({ ...data, ...{ sw_id: cvId, nrc_mm: null } }));
    }
    await dispatch(getCvById({ type: "sw", id: cvId }));
    handleClose();
    reset();
    setNrcData(null);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setAddNrc(false);
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "left" }}>
          {"Add Child"}
        </DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <form onSubmit={handleSubmit(handleCreate)}>
            <Box sx={{ pt: 1, display: "flex", mb: 2, gap: 2 }}>
              <TextField
                sx={{ width: "50%" }}
                {...register("name_mm")}
                fullWidth
                label={"Name in Burmese"}
                error={!!errors.name_mm}
                helperText={errors?.name_mm?.message}
              />
              <TextField
                {...register("age")}
                sx={{ width: "50%" }}
                fullWidth
                label={"Age"}
                error={!!errors.age}
                helperText={errors?.age?.message}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap", px: 2, mr: 2 }}
                onClick={() => {
                  setAddNrc((prev) => !prev);
                }}
              >
                {addNrc ? "Hide" : "Set NRC"}
              </Button>
              <Typography variant="body2">
                If he/she has NRC, please fill its out.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" sx={{ ml: 2 }} autoFocus>
                Add new
              </Button>
            </Box>
          </form>          
          {addNrc && (
            <>
              <Divider sx={{ my: 3 }}>NRC REGISTRATION</Divider>
              <NRCSection
                data={nrcData}
                setData={setNrcData}
                setStatus={setAddNrc}
                edit={false}
              ></NRCSection>
            </>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddChild;
