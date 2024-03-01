import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import NRCSection from "./NRCSection";
import { getNrcData } from "mm-nrc";
import { convertToMyanmarNumbers } from "../../../../utils/enTomm";
import {
  getCvById,
  updateChild,
} from "../../../../slices/backOffice/cvFromSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const childSchema = Yup.object().shape({
  name_mm: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Please enter a valid age")
    .integer("Please enter a valid age")
    .required("Age is required"),
});

const EditChild = ({ open, setOpen, oldData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(open);
  const [addNrc, setAddNrc] = useState(false);
  const [nrcData, setNrcData] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
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
    const filteredState = getNrcData().nrcStates.filter(
      (state) => state.number.en === stateNo
    );
    const filteredTownship = getNrcData().nrcTownships.filter(
      (township) => township.short.en === townshipCode
    );
    const filteredType = getNrcData().nrcTypes.filter(
      (type) => type.name.en === nrcType
    );
    const mmNrcNumber = nrcNumber && convertToMyanmarNumbers(nrcNumber);
    const mmType = filteredType[0]?.name?.mm;
    const mmTownship = filteredTownship[0]?.short?.mm;
    const mmState = filteredState[0]?.number?.mm;
    const mmNrc = `${mmState}/${mmTownship}(${mmType})${mmNrcNumber}`;
    return mmNrc;
  };

  const handleUpdate = async (data) => {
    if (nrcData && typeof nrcData === "object") {
      const nrcMM = await changeNrcFormat(
        nrcData.state,
        nrcData.township,
        nrcData.type,
        nrcData.nrc_no
      );
      dispatch(
        updateChild({
          data: { ...data, ...{ nrc_mm: nrcMM } },
          id: oldData[0].id,
        })
      );
    } else if (nrcData && typeof nrcData === "string") {
      dispatch(
        updateChild({
          data: { ...data, ...{ nrc_mm: nrcData } },
          id: oldData[0].id,
        })
      );
    } else {
      dispatch(updateChild({
        data: {...data, ...{ nrc_mm: null }},
        id: oldData[0].id
      }));
    }
    await dispatch(getCvById({ type: "sw", id: id }));
    handleClose();
    reset();
    setNrcData(null);
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setAddNrc(false);
  }, [open]);

  useEffect(() => {
    if (oldData) {
      setValue("name_mm", oldData[0].name_mm);
      setValue("age", oldData[0].age);
      setNrcData(oldData[0].nrc_mm);
    }
  }, [oldData]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "left" }}>
          {"Edit Child"}
        </DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Box sx={{ pt: 1, display: "flex", mb: 2, gap: 2 }}>
              <TextField
                sx={{ width: "50%" }}
                {...register("name_mm")}
                fullWidth
                label={"Name in Burmese"}
                error={!!errors.name_mm}
                helperText={errors?.name_mm?.message}
              />
              <Box sx={{ display: "flex", width: "50%" }}>
                <TextField
                  {...register("age")}
                  fullWidth
                  label={"Age"}
                  error={!!errors.age}
                  helperText={errors?.age?.message}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap", px: 2, mr: 2 }}
                onClick={() => {
                  setAddNrc((prev) => !prev);
                }}
              >
                {addNrc ? "Hide" : "Update NRC"}
              </Button>
              <Typography variant="body2">
                If he/she has NRC, please fill it out.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" sx={{ ml: 2 }} autoFocus>
                Update
              </Button>
            </Box>
          </form>
          {addNrc && (
            <NRCSection
              data={nrcData}
              setData={setNrcData}
              setStatus={setAddNrc}
              edit={true}
            ></NRCSection>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditChild;
