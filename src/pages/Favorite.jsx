import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import NowPlaying from "../components/NowPlaying";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import "./Favorite.scss";
import { styled } from "@mui/material/styles";
import NoEpisodeFound from "../components/Favorite/NoEpisodeFound";
import { useApp } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { GetCategory, GetFavoriteIds } from "../api/acAPI";
import { FavoriteCardCollection } from "../components/Favorite/FavoriteCardCollection";
import { FavoriteProvider } from "../contexts/FavoriteContext";
import { searchEpisodeDetail, searchEpisodes } from "../api/spotifyAPI";

export default function Favorite() {
  const { setBookmark, setSavedFavorite } = useApp();

  const [savedShows, setSavedShows] = useState([]);
  const [fetchShows, setFetchShows] = useState([]);

  const isShowCardCollection =
    savedShows.length !== 0 ? (
      <FavoriteCardCollection data={fetchShows} />
    ) : (
      <NoEpisodeFound />
    );

  useEffect(async () => {
    // Initialize Bookmark
    const fetchBookmark = await GetCategory();
    if (fetchBookmark !== undefined) {
      setBookmark(fetchBookmark);
    }

    // Initialize Episodes
    const fetchEpisode = await GetFavoriteIds();
    const episodes = fetchEpisode.map((item) => item.id);

    setSavedFavorite(episodes);

    if (episodes) {
      setSavedShows(episodes);

      const fetchEpisodeDetail = await searchEpisodeDetail(episodes);
      setFetchShows(fetchEpisodeDetail);
    }
  }, []);

  return (
    <FavoriteProvider>
      <ResponsiveDrawer>
        <Grid container direction="row" spacing={2}>
          <Grid item lg={9} xs={9} sm={9} md={9} xl={9} sx={{ p: 0 }}>
            <HideOnScroll>
              <Box width="100%">{isShowCardCollection}</Box>
            </HideOnScroll>
          </Grid>
          <Grid item lg={3} xs={3} sm={3} md={3} xl={3}>
            <NowPlaying />
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </FavoriteProvider>
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
