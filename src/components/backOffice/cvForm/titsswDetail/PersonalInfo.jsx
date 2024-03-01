import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import CvListItem from "../../../main/CvListItem";
import { transform } from "../../../../utils/transformsrc";
import Personal1 from "../titsswEdit/Personal1";
import theme from "../../../../utils/theme";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Personal2 from "../titsswEdit/Personal2";
import Personal3 from "../titsswEdit/Personal3";
import { useDispatch, useSelector } from "react-redux";
import { getOldData } from "../../../../slices/backOffice/updateTitsswslice";
import Personal4 from "../titsswEdit/Personal4";
import PhotosEdit from "../titsswEdit/PhotosEdit";

const PersonalInfo = ({ cv }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.User?.profile?.data);
  const [photo, setPhoto] = useState(null);
  const [qrPhoto, setQrPhoto] = useState(null);
  const [personal1Open, setPersonal1Open] = useState(false);
  const [personal2Open, setPersonal2Open] = useState(false);
  const [personal3Open, setPersonal3Open] = useState(false);
  const [personal4Open, setPersonal4Open] = useState(false);
  const [photoEditOpen, setPhotoEditOpen] = useState(false);
  const [photoType, setPhotoType] = useState(null);

  const setOldData = async (oldData) => {
    if (oldData && profile) {
      const base64Photo = await transform(oldData.photo);
      const base64QrPhoto = await transform(oldData.qr_photo);
      setPhoto(base64Photo);
      setQrPhoto(base64QrPhoto);
      await dispatch(
        getOldData({
          ...oldData,
          ...{
            user_id: Number(oldData.user_id),
            photo: base64Photo,
            qr_photo: base64QrPhoto,
          },
        })
      );
    }
  };

  useEffect(() => {
    if(cv) {
      setOldData(cv);
    }
  }, [cv]);

  return (
    <Box sx={{ display: "flex" }}>
      <Personal1 open={personal1Open} setOpen={setPersonal1Open} />
      <Personal2 open={personal2Open} setOpen={setPersonal2Open} />
      <Personal3 open={personal3Open} setOpen={setPersonal3Open} />
      <Personal4 open={personal4Open} setOpen={setPersonal4Open} />
      <PhotosEdit
        open={photoEditOpen}
        setOpen={setPhotoEditOpen}
        type={photoType}
      ></PhotosEdit>
      <Grid container columns={{ md: 12 }} sx={{ width: "70%" }}>
        <Grid item md={4}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  onClick={() => setPersonal1Open(true)}
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutlineIcon />
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
            <CvListItem
              dataKey={"name_jp"}
              primary="Name(Japanese)"
              value={cv.name_jp}
            ></CvListItem>
            <CvListItem primary="Phone" value={cv.phone}></CvListItem>
            <CvListItem primary="Email" value={cv.email}></CvListItem>
            <CvListItem
              primary="Date of Birth"
              value={cv.date_of_birth}
            ></CvListItem>
            <CvListItem primary="Gender" value={cv.gender}></CvListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  onClick={() => setPersonal2Open(true)}
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary="Height"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color={theme.palette.dark.main}
                    >
                      {`${cv.height} cm`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <CvListItem primary="Weight" value={`${cv.weight} Kg`}></CvListItem>
            <CvListItem primary="Blood Type" value={cv.blood_type}></CvListItem>
            <CvListItem primary="Religion" value={cv.religion}></CvListItem>
            <CvListItem
              primary="Visibility(Left)"
              value={cv.eye_left}
            ></CvListItem>
            <CvListItem
              primary="Visibility(Right)"
              value={cv.eye_right}
            ></CvListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  onClick={() => setPersonal3Open(true)}
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary="Hometown"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color={theme.palette.dark.main}
                    >
                      {cv.hometown}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <CvListItem
              primary="Like"
              value={`${cv.betal === "1" ? "Betal" : "-"} 
                        ${cv.cigrette === "1" ? "Cigrette" : "-"}
                        ${cv.alcohol === "1" ? "Alcohol" : "-"}
                        ${cv.tattoo === "1" ? "Tattoo" : "-"}`}
            />
            <CvListItem
              primary="Left handed / Right handed"
              value={cv.left_right_handed}
            ></CvListItem>
            <CvListItem
              primary="Can Ride bicycle"
              value={cv.bicycle}
            ></CvListItem>
            <CvListItem
              primary="Marriage Status"
              value={cv.marriage_status}
            ></CvListItem>
            <CvListItem primary="Group Live" value={cv.group_live}></CvListItem>
            <CvListItem primary="Surgery" value={cv.surgery}></CvListItem>
          </List>
        </Grid>
        <Grid item md={12}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  onClick={() => setPersonal4Open(true)}
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary="Hobby"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color={theme.palette.dark.main}
                    >
                      {cv.hobby}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <CvListItem
              primary="Strong Point"
              value={cv.strong_point}
            ></CvListItem>
            <CvListItem primary="Weak Point" value={cv.weak_point}></CvListItem>
            <CvListItem primary="Dream" value={cv.dream}></CvListItem>
            <CvListItem primary="PR" value={cv.pr}></CvListItem>
          </List>
        </Grid>
      </Grid>
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
              my: 2,
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
    </Box>
  );
};

export default PersonalInfo;
