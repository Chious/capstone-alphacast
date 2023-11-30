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
import { PodcastCardCollection } from "../SearchCard";

// useContext
import { useApp } from "../../contexts/AppContext";

// Spotify api
import { searchEpisodes, GetAuthors } from "../../api/spotifyAPI";
import { PostFavorite } from "../../api/acAPI";

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

export default function NavigateModal({ open, setOpen }) {
  const { editBookmark, setEditBookmark } = useApp();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditBookmark({ edit: null, target: null, doublecheck: null });
  };

  useEffect(() => {
    const { target, edit } = editBookmark;

    if (target && edit === "navigate") {
      handleOpen();
    }
  }, [editBookmark.edit]);

  //set Data from search result
  const [data, setData] = useState([]);
  const [authorList, setAuthorList] = useState([]);
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
      console.log("id: ", id);

      const res = await PostFavorite(id); // post id to favorite
      if (res === "success") {
        console.log("success!");
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                新增Poodcast
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider />
            <SearchInput setData={setData} setAuthorList={setAuthorList} />
            <SearchResult
              data={data}
              authorList={authorList}
              card={card}
              setCard={setCard}
            />
          </Stack>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button sx={{ width: "200px" }} onClick={handleClose}>
                取消
              </Button>
              <Button
                sx={{ width: "200px" }}
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
function SearchInput({ setData, setAuthorList }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const response = await searchEpisodes({ input });
    if (response !== undefined) {
      const ids = response.map((obj) => {
        return obj.id;
      });
      const authors = await GetAuthors(ids);
      setAuthorList(authors);
      setData(response);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} width="100%">
      <SearchIcon />
      <TextField
        placeholder="type something..."
        onChange={handleInput}
        sx={{ height: "50px", width: "80%" }}
      />
      <button
        onClick={async () => {
          handleClick();
        }}
        style={{ height: "50px" }}
      >
        提交
      </button>
    </Stack>
  );
}

function SearchResult({ data, authorList, card, setCard }) {
  return (
    <>
      <Typography>搜尋結果</Typography>
      <Box>
        <HideOnScroll>
          <PodcastCardCollection
            data={data}
            authorList={authorList}
            card={card}
            setCard={setCard}
          />
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
