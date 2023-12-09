import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import { Grid, Box, styled } from "@mui/material";
import NowPlaying from "../components/NowPlaying";
import NoEpisodeFound from "../components/BookmarkPage/NoEpisodeFound";
import { BookmarkProvider } from "../contexts/BookmarkContext";
import { useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { GetCategory } from "../api/acAPI";
import { useEffect, useState } from "react";
import { BookmarkCardCollection } from "../components/BookmarkPage/BookmarkCard";
import { searchShowDetail } from "../api/spotifyAPI";
import ShowSeriesModal from "../components/Modal/ShowSeriesModal";

export default function BookmarkPage() {
  //Get Saved Episodes
  const { id } = useParams();
  const [savedShows, setSavedShows] = useState([]);
  const [savedShowsDetail, setSavedShowsDetail] = useState([]);

  // open the seacrh modal
  const [open, setOpen] = useState(false);
  const [showId, setShowId] = useState(null);
  const isShowCardCollection =
    savedShows.length !== 0 ? (
      <BookmarkCardCollection
        data={savedShowsDetail}
        setOpen={setOpen}
        setShowId={setShowId}
      />
    ) : (
      <NoEpisodeFound pageId={id} />
    );

  const { setBookmark } = useApp();
  useEffect(async () => {
    //Initialize Bookmarks
    const response = await GetCategory();
    setBookmark(response);

    const found = response.find((item) => item.id === String(id));

    //Initialize Saved Episodes
    if (found) {
      const foundSavedShows = found.savedShows.map((item) => {
        const { id } = item;
        return id;
      });
      setSavedShows(foundSavedShows);
    } else {
      console.log("No Object Found");
    }
  }, []);

  useEffect(async () => {
    if (savedShows.length !== 0) {
      // If savedShows is not null, search for detail
      const response = await searchShowDetail(savedShows);
      setSavedShowsDetail(response);
    }
  }, [savedShows]);

  return (
    <BookmarkProvider>
      <ResponsiveDrawer>
        <Grid container direction="row" spacing={2}>
          <Grid item lg={9}>
            <HideOnScroll>
              <Box>{isShowCardCollection}</Box>
            </HideOnScroll>
          </Grid>
          <Grid item lg={3}>
            <NowPlaying />
          </Grid>
        </Grid>
        <ShowSeriesModal open={open} setOpen={setOpen} showId={showId} />
      </ResponsiveDrawer>
    </BookmarkProvider>
  );
}

function HideOnScroll(props) {
  const { children } = props;

  const ScrollableBox = styled(Box)`
    max-height: 90vh; /* Set a maximum height to enable scrolling */
    overflow: auto; /* Enable the scrollbar when content overflows */
  `;

  return <ScrollableBox>{children}</ScrollableBox>;
}
