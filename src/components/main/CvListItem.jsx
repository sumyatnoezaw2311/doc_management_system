import React from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import theme from "../../utils/theme";

const CvListItem = ({ primary, value, style }) => {

    // const [open, setOpen] = React.useState(false);

    // const handleEdit = ()=>{
    //   setOpen(true)
    // }

    return (
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={primary}
            sx={style}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color={theme.palette.dark.main}
                >
                  {value}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
  );
  };

export default CvListItem