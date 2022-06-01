import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginLogoutTabs from "./LoginLogoutTabs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const closeHandler = () => {
    handleClose();
    console.log(props.onClose);
    props.onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="div" component="h2">
            <LoginLogoutTabs baseUrl={props["baseUrl"]} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
