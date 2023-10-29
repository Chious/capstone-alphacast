import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import { Grid, Box } from "@mui/material";
import { PodcastCardCollection } from "../components/PodcastCard";
import NowPlaying from "../components/NowPlaying";

export default function BookmarkPage() {
  return (
    <ResponsiveDrawer>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={9}>
          <HideOnScroll>
            <Box>
              <PodcastCardCollection />
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
