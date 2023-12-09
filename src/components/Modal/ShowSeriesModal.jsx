import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Search Bar
import { styled } from "@mui/material/styles";

// CircularProgress
import CircularProgress from "@mui/material/CircularProgress";
import { getShowEpisodes } from "../../api/spotifyAPI";
import { FavoriteCardCollection } from "../Favorite/FavoriteCardCollection";

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

export default function ShowSeriesModal({ open, setOpen, showId }) {
  const handleClose = () => {
    setOpen(false);
  };

  //set Data from search result
  const [data, setData] = useState([]);

  // Initialize Card
  useEffect(async () => {
    if (showId) {
      const response = await getShowEpisodes(showId);
      setData(response);
    }
  }, [showId]);

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
            <Stack direction="row" alignItems="center" justifyContent="end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider />
            <SearchResult data={data} />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

function SearchResult({ data }) {
  return (
    <>
      <Box>
        <HideOnScroll>
          <FavoriteCardCollection data={data} />
        </HideOnScroll>
      </Box>
    </>
  );
}

// Scroll bar
function HideOnScroll(props) {
  const { children } = props;

  const ScrollableBox = styled(Box)`
    max-height: 450px; /* Set a maximum height to enable scrolling */
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
