import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import { Grid, Box, styled } from "@mui/material";
import NowPlaying from "../components/NowPlaying";
import NoEpisodeFound from "../components/Favorite/NoEpisodeFound";
import { BookmarkProvider } from "../contexts/BookmarkContext";
import { useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { GetCategory } from "../api/acAPI";
import { useEffect, useState } from "react";
import { BookmarkCardCollection } from "../components/BookmarkCard";

export default function BookmarkPage() {
  //Get Saved Episodes
  const { id } = useParams();
  const [savedShows, setSavedShows] = useState([]);
  const isShowCardCollection =
    savedShows.length !== 0 ? <BookmarkCardCollection /> : <NoEpisodeFound />;

  const { setBookmark } = useApp();
  useEffect(async () => {
    //Initialize Bookmarks
    const response = await GetCategory();
    setBookmark(response);

    const found = response.find((item) => item.id === String(id));

    //Initialize Saved Episodes
    if (found) {
      setSavedShows(found.savedShows);
    } else {
      console.log("No Object Found");
    }
  }, []);

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
