import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateDemand from "../../../pages/back_office/demand/CreateDemand";
import CreateCoe from "../../../pages/back_office/coe/CreateCoe";
import CreatePredep from "../../../pages/back_office/predeparture/CreatePredep";
import CreateOwic from "../../../pages/back_office/smartCard/CreateOwic";
import Departure from "../../../pages/back_office/departure/Departure";
import CreateDemandSw from "../../../pages/back_office/demand/CreateDeamandSw";
import { downAtBlink, generatePdf, resetLink } from "../../../slices/backOffice/documentSlice";
// import { downAtBlink } from "../../../utils/downAtBlink";

const DEMAND_LETTER_STEP = 0;
// const COE_STEP = 1;
// const PRE_DEPARTURE_STEP = 2;
// const DEPARTURE_DATE = 3;
// const SMART_CARD_STEP = 4;

const getSteps = (type) => {
  if (type === 1) {
    return ["Demand Letter", "COE", "Pre-departure", "Departure Date", "Smart Card"];
  } else {
    return ["Demand Letter", "Pre-departure", "Departure Date", "Smart Card"];
  }
};

const DocSteps = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const [activeStep, setActiveStep] = useState(DEMAND_LETTER_STEP);
  const [passedMembers, setPassedMembers] = useState([]);
  const [ isDisable, setIsDisable ] = useState(false)
  const singleGroup = useSelector((state) => state.IntGroup.group);
  const type = path.includes("titssw") ? "titssw" : "sw";
  const [steps, setSteps] = useState(getSteps(type));
  const [modals, setModals] = useState({
    demandOpen: false,
    coeOpen: false,
    predepOpen: false,
    smartCardOpen: false,
    depOpen: false,
  });

  const downloadByGroup = async (gpId, gpName, type) => {
    const option = {
      export_type: "group",
      id: gpId,
      data_kind: type,
    };
    const { payload } = await dispatch(generatePdf(option));
    const url = payload?.data;
    await dispatch(downAtBlink({url: url, filename: `${Date.now()}_${gpName}_${type}.zip`}));
    dispatch(resetLink());
  };

  useEffect(() => {
    if (singleGroup) {
      const { data } = singleGroup;
      data.type === 1 ? setIsDisable(Boolean(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date && data.smart_card_date)) :
      setIsDisable(Boolean(data.demand_letter_date && data.predeparture && data.departure_date && data.smart_card_date));
      const filteredMembers = data.member_data.filter(
        (member) => member.interview_status === "pass"
      );
      setPassedMembers(filteredMembers);
      // let updatedSteps;
      if (data.type === 1) {
        // updatedSteps = getSteps(data.type);
        if(data.demand_letter_date) setActiveStep(1)
        if(data.demand_letter_date && data.coe_datas) setActiveStep(2)
        if(data.demand_letter_date && data.coe_datas && data.predeparture) setActiveStep(3)
        if(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date) setActiveStep(4)
        if(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date && !data.smart_card_date) setActiveStep(4)
        if(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date && data.smart_card_date) setActiveStep(5)
        setSteps(getSteps(data.type));
      } else if (data.type === 2 || data.type === 3) {
        // updatedSteps = getSteps(type).filter((step) => step !== "COE");
        // setSteps(updatedSteps)
        // updatedSteps = getSteps(data.type);
        if (data.demand_letter_date) setActiveStep(1);
        if (data.demand_letter_date && data.predeparture && !data.departure_date) setActiveStep(2);
        if (data.demand_letter_date && data.predeparture && data.departure_date && !data.smart_card_date) setActiveStep(3);
        if (data.demand_letter_date && data.predeparture && data.departure_date && data.smart_card_date) setActiveStep(4);
        setSteps(getSteps(data.type));
      }
      
    }
  }, [singleGroup, steps.length]);

  const renderOptionalText = (index) => {
    const demandDate = singleGroup?.data?.demand_letter_date;
    const coeCreatedDate = singleGroup?.data?.coe_datas?.coe_dc_date;
    const predepDate = singleGroup?.data?.predeparture?.date;
    const departureDate = singleGroup?.data?.departure_date;
    const smartCardDate = singleGroup?.data?.smart_card_date;
    return (
      index < activeStep && (
        <Typography variant="body2">
          {index === 0 && demandDate && `Demand Date: ${demandDate}`}
          {index === 1 && singleGroup?.data.type === 1 && coeCreatedDate && `COE document created at: ${coeCreatedDate}`}
          {(index === 2 && singleGroup?.data.type === 1 || (index === 1 && singleGroup?.data.type !== 1)) && predepDate && `Predeparture date: ${predepDate}`}
          {(index === 3 && singleGroup?.data.type === 1 || (index === 2 && singleGroup?.data.type !== 1)) && departureDate && `Departure Date: ${departureDate}`}
          {(index === 4 && singleGroup?.data.type === 1 || (index === 3 && singleGroup?.data.type !== 1)) && smartCardDate && `Smartcard date: ${smartCardDate}`}
        </Typography>
      )
    );
  };

  useEffect(() => {
    setActiveStep(DEMAND_LETTER_STEP);
  }, []);

  const handleModalOpen = (modal) => {
    setModals((prevModals) => ({ ...prevModals, [modal]: true }));
  };

  const handleEditClick = (index) => {
    switch (index) {
      case 0:
        handleModalOpen("demandOpen");
        break;
      case 1:
        if (singleGroup.data.type === 1) handleModalOpen("coeOpen");
        else handleModalOpen("predepOpen");
        break;
      case 2:
        if (singleGroup.data.type === 1) handleModalOpen("predepOpen");
        else handleModalOpen("depOpen");
        break;
      case 3:
        if (singleGroup.data.type === 1) handleModalOpen("depOpen");
        else handleModalOpen("smartCardOpen");
        break;
      case 4:
        handleModalOpen("smartCardOpen");
        break;
      default:
        break;
    }
  };

  const handleDownloadClick = async (index) => {
    const { id, name } = singleGroup?.data;

    switch (index) {
      case 0:
        downloadByGroup(id, name, "demand_letter");
        break;
      case 1:
        downloadByGroup(id, name, type === "titssw" ? "coe" : "pre_dep");
        break;
      case 2:
        downloadByGroup(id, name, type === "titssw" ? "pre_dep" : "dep");
        break;
      case 3:
        downloadByGroup(id, name, type === "titssw" ? "dep" : "smartcard");
        break;
      case 4:
        downloadByGroup(id, name, "smartcard");
        break;
      default:
        break;
    }
  };

  const renderStepActions = (index) => {
    const isCurrentStep = index === activeStep;
    const canDownload =
      isCurrentStep ||
      (index < activeStep &&
        !(singleGroup?.data.type === 1 && index === 3) &&
        !(singleGroup?.data.type !== 1 && index === 2));

    return (
      <Box>
        {index < activeStep && (
          <>
            <Button
              onClick={() => handleEditClick(index)}
              variant="text"
              color="dark"
            >
              Edit
            </Button>
            {/* {canDownload && (
              <Button
                variant="text"
                color="success"
                disabled={!isDisable}
                onClick={() => handleDownloadClick(index)}
              >
                Download
              </Button>
            )} */}
            {
              (singleGroup.data.type === 1 && index === 3) || !(singleGroup.data.type !== 1 && index === 2 ) &&
              <Button
                  variant="text"
                  color="success"
                  // disabled={!isDisable}
                  onClick={() => handleDownloadClick(index)}
                >
                  Download
              </Button>
            }
          </>
        )}
        {isCurrentStep && (
          <Button
            variant="text"
            color="warning"
            disabled={!(passedMembers.length > 0)}
            onClick={() => handleEditClick(index)}
          >
            {canDownload ? "create" : "download"}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {singleGroup?.data?.type === 3 ? (
        <CreateDemandSw
          isOpen={modals.demandOpen}
          setIsOpen={(value) => setModals({ ...modals, demandOpen: value })}
        />
      ) : (
        <CreateDemand
          isOpen={modals.demandOpen}
          setIsOpen={(value) => setModals({ ...modals, demandOpen: value })}
        />
      )}
      {singleGroup?.data?.type === 1 && (
        <CreateCoe
          isOpen={modals.coeOpen}
          setIsOpen={(value) => setModals({ ...modals, coeOpen: value })}
        />
      )}
      <Departure
        isOpen={modals.depOpen}
        setIsOpen={(value) => setModals({ ...modals, depOpen: value })}
      />
      <CreatePredep
        isOpen={modals.predepOpen}
        setIsOpen={(value) => setModals({ ...modals, predepOpen: value })}
      />
      <CreateOwic
        isOpen={modals.smartCardOpen}
        setIsOpen={(value) => setModals({ ...modals, smartCardOpen: value })}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel optional={renderOptionalText(index)}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography>{step}</Typography>
                {renderStepActions(index)}
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default DocSteps;
