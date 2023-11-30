import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import NowPlaying from "../components/NowPlaying";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import "./Favorite.scss";
import { styled } from "@mui/material/styles";
import NoEpisodeFound from "../components/Favorite/NoEpisodeFound";
import { useApp } from "../contexts/AppContext";
import { useEffect } from "react";
import { GetCategory } from "../api/acAPI";

export default function Favorite() {
  const { setBookmark } = useApp();

  useEffect(async () => {
    const response = await GetCategory();
    setBookmark(response);
  }, []);

  return (
    <ResponsiveDrawer>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={9}>
          <HideOnScroll>
            <Box width="100%">
              <NoEpisodeFound />
            </Box>
          </HideOnScroll>
        </Grid>
        <Grid item lg={3}>
          <NowPlaying />
        </Grid>
      </Grid>
    </ResponsiveDrawer>
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
