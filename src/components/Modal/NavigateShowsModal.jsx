import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Search Bar
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

// CircularProgress
import CircularProgress from "@mui/material/CircularProgress";

// Spotify api
import { searchShows } from "../../api/spotifyAPI";
import { addShowToCategory } from "../../api/acAPI";
import { ShowCardCollection } from "../SearchShowsCard";

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

export default function NavigateShowsModal({ open, setOpen, pageId }) {
  const handleClose = () => {
    setOpen(false);
  };

  //set Data from search result
  const [data, setData] = useState([]);
  //remember selected card
  const [card, setCard] = useState({
    id: null,
    title: null,
    author: null,
    imgSrc: null,
  });

  //Submit

  const handleSubmit = async () => {
    if (card.id !== null) {
      const { id } = card; //Episode ID

      const res = await addShowToCategory({ categoryId: pageId, showId: id }); // post id to categories
      if (res === "success") {
        handleClose(); // Close the modal
      }
    }
  };

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
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontWeight="500"
              >
                新增Poodcast
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider />
            <SearchInput setData={setData} />
            <SearchResult data={data} card={card} setCard={setCard} />
          </Stack>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button
                sx={{ width: "200px", color: "#111111" }}
                onClick={handleClose}
              >
                取消
              </Button>
              <Button
                sx={{
                  width: "200px",
                  background: "#FF7F50",
                  color: "white",
                  "&:hover": { background: "white", color: "#FF7F50" },
                }}
                onClick={async () => {
                  handleSubmit();
                }}
              >
                確認新增
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// Search Bar
function SearchInput({ setData }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const response = await searchShows({ input });
    if (response !== undefined) {
      const ids = response.map((obj) => {
        return obj.id;
      });
      setData(response);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      width="100%"
      sx={{
        background: "#F5F5F5",
        p: 1,
        border: "1px solid transparent",
        borderRadius: "5px",
      }}
    >
      <SearchIcon />
      <input
        placeholder="開始搜尋..."
        onChange={handleInput}
        style={{
          color: "black",
          height: "30px",
          width: "90%",
          background: "transparent",
          border: "1px solid transparent",
        }}
        onKeyDown={async (e) => {
          handleKeyPress(e);
        }}
      />
    </Stack>
  );
}

function SearchResult({ data, card, setCard }) {
  return (
    <>
      <Typography>搜尋結果</Typography>
      <Box>
        <HideOnScroll>
          <ShowCardCollection data={data} card={card} setCard={setCard} />
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
