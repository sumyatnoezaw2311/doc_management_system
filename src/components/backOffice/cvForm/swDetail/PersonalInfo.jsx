import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CvListItem from "../../../main/CvListItem";
import { transform } from "../../../../utils/transformsrc";
import { DriveFileRenameOutline } from "@mui/icons-material";
import theme from "../../../../utils/theme";
import Personal1 from "./Personal1";
import { useDispatch, useSelector } from "react-redux";
import { getOldData } from '../../../../slices/backOffice/updateSwSlice'
import Personal2 from "./Personal2";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PhotosEdit from "../titsswEdit/PhotosEdit";


const PersonalInfo = ({ cv }) => {

  const dispatch = useDispatch()
  const profile = useSelector((state) => state.User?.profile?.data);
  const [photo, setPhoto] = useState(null);
  const [qrPhoto, setQrPhoto] = useState(null);
  const [ infoOneOpen, setInfoOneOpen ] = useState(false)
  const [ infoTwoOpen, setInfoTwoOpen ] = useState(false)
  const [photoEditOpen, setPhotoEditOpen] = useState(false);
  const [photoType, setPhotoType] = useState(null);

  const setOldData = async (oldData) => {
    if (oldData && profile) {
      const base64Photo = await transform(oldData.photo);
      const base64QrPhoto = await transform(oldData.qr_photo);
      setPhoto(base64Photo)
      setQrPhoto(base64QrPhoto)
      await dispatch(
        getOldData({
          ...oldData,
          ...{ user_id: Number(oldData.user_id) ,photo: base64Photo, qr_photo: base64QrPhoto },
        })
      );
    }
  };

  useEffect(() => {
    if (cv) {
      setOldData(cv)
    }
  }, [cv,profile]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Personal1 open={infoOneOpen} setOpen={setInfoOneOpen}/>
      <Personal2 open={infoTwoOpen} setOpen={setInfoTwoOpen}/>
      <PhotosEdit
        open={photoEditOpen}
        setOpen={setPhotoEditOpen}
        type={photoType}
      ></PhotosEdit>
      <Box sx={{ width: "30%" }}>
        <ImageListItem sx={{ mr: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 2,
            }}
          >
            <Typography sx={{ textAlign: "start" }} variant="button">
              User's Photo
            </Typography>
            <IconButton
              onClick={() => {
                setPhotoType("userPhoto");
                setPhotoEditOpen(true);
              }}
              size="small"
              variant="outlined"
              color="warning"
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </Box>
          <img
            src={photo}
            alt="User's Photo"
            style={{ width: 300, height: "auto" }}
          />
        </ImageListItem>
        <ImageListItem>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
          }}
        >
          <Typography sx={{ textAlign: "start" }} variant="button">
            Telegram QR Photo
          </Typography>
          <IconButton
            onClick={() => {
              setPhotoType("qrPhoto");
              setPhotoEditOpen(true);
            }}
            size="small"
            variant="outlined"
            color="warning"
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </Box>
        <img
          src={qrPhoto}
          alt="Telegram QR Photo"
          style={{ width: 300, height: "auto" }}
        />
      </ImageListItem>
      </Box>
    <Grid container columns={{ md: 12 }}>
      <Grid item md={5}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <IconButton
                onClick={() => setInfoOneOpen(true)}
                size="small"
                variant="outlined"
                color="warning"
              >
                <DriveFileRenameOutline />
              </IconButton>
            }
          >
            <ListItemText
              primary="Name(English)"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color={theme.palette.dark.main}
                  >
                    {cv.name_eng}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <CvListItem primary="Name(Japanese)" value={cv.name_jp}></CvListItem>
          <CvListItem primary="Phone" value={cv.phone}></CvListItem>
          <CvListItem primary="Email" value={cv.email}></CvListItem>
          <CvListItem
            primary="Date of Birth"
            value={cv.date_of_birth}
          ></CvListItem>
          <CvListItem primary="Gender" value={cv.gender}></CvListItem>
          <CvListItem
            primary="Marriage Status"
            value={cv.marriage_status}
          ></CvListItem>
        </List>
      </Grid>
      <Grid item md={7}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  onClick={() => setInfoTwoOpen(true)}
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutline />
                </IconButton>
              }
            >
              <ListItemText
                primary="Address(English)"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color={theme.palette.dark.main}
                    >
                      {cv.address_eng}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          <CvListItem
            primary="Address(Japanese)"
            value={cv.address_jp}
          ></CvListItem>
          <CvListItem
            primary="Dependent Family"
            value={cv.dependent_family}
          ></CvListItem>
          <CvListItem
            primary="Family(Address)"
            value={cv.family_address}
          ></CvListItem>
          <CvListItem
            primary="Family(Phone)"
            value={cv.family_phone}
          ></CvListItem>
          <CvListItem primary="PR" value={cv.pr}></CvListItem>
        </List>
      </Grid>
    </Grid>
    </Box>
  );
};

export default PersonalInfo;
