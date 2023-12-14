import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Stack } from "@mui/material";
import { useApp } from "../../contexts/AppContext";

export default function SimpleSnackbar() {
  const { snackState, setSnackState } = useApp();
  const { open, state, message } = snackState;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackState({ state: false, message: null });
  };

  //return different color, depend on state
  const colors = {
    success: "#4CAF50",
    fail: "#FF5050",
    unknown: "#F6AE2D",
  };

  const stateColor = (state) => {
    return colors[state] || "";
  };

  const icons = {
    success: <CheckIcon sx={{ color: stateColor(state) }} />,
    fail: <CloseIcon sx={{ color: stateColor(state) }} />,
    unknown: <PriorityHighIcon sx={{ color: stateColor(state) }} />,
  };

  const stateIcon = (state) => {
    return icons[state] || "";
  };

  return (
    <div>
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "white",
            color: "black",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack
              style={{
                border: "2px solid",
                borderColor: stateColor(state),
                borderRadius: "20px",
                width: "30px",
                height: "30px",
              }}
              justifyContent="center"
              alignItems="center"
            >
              {stateIcon(state)}
            </Stack>
            <p>{message}</p>
          </Stack>
        }
      />
    </div>
  );
}
