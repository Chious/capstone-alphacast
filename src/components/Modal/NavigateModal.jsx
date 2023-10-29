import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Search Bar
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

// CircularProgress
import CircularProgress from "@mui/material/CircularProgress";
import { PodcastCardCollection } from "../PodcastCard";

// useContext

import { useApp } from "../../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  height: "75vh",
  bgcolor: "background.paper",
  border: "2px solid none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const ButtonGroupstyle = {
  backgroundColor: "white",
  boxShadow: 24,

  position: "absolute",
  bottom: 0,
  left: 0,

  width: "100%",
  p: 1,

  border: "1px solid none",
  borderRadius: "0px 0px 5px 5px",
};

export default function NavigateModal() {
  const { editBookmark, setEditBookmark } = useApp();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditBookmark({ edit: null, target: null, doublecheck: null });
  };

  React.useEffect(() => {
    const { target, edit } = editBookmark;

    if (target && edit === "navigate") {
      handleOpen();
    }
  }, [editBookmark.edit]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                新增Poodcast
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider />
            <SearchInput />
            <SearchResult />
          </Stack>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button sx={{ width: "200px" }} onClick={handleClose}>
                取消
              </Button>
              <Button sx={{ width: "200px" }}>確認新增</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// Search Bar
function SearchInput() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}

function SearchResult() {
  return (
    <>
      <Typography>搜尋結果</Typography>
      <Box>
        <HideOnScroll>
          <PodcastCardCollection />
        </HideOnScroll>
      </Box>
    </>
  );
}

// Scroll bar
function HideOnScroll(props) {
  const { children } = props;

  const ScrollableBox = styled(Box)`
    max-height: 300px; /* Set a maximum height to enable scrolling */
    overflow: auto; /* Enable the scrollbar when content overflows */
  `;

  return <ScrollableBox>{children}</ScrollableBox>;
}

// For Padding Condition
function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}
