import ResponsiveDrawer from "../components/Appbar/ResponsiveDrawer";
import { Grid, Box, styled } from "@mui/material";
import NowPlaying from "../components/NowPlaying";
import { BookmarkCardCollection } from "../components/BookmarkCard";
import { BookmarkProvider } from "../contexts/BookmarkContext";

export default function BookmarkPage() {
  return (
    <BookmarkProvider>
      <ResponsiveDrawer>
        <Grid container direction="row" spacing={2}>
          <Grid item lg={9}>
            <HideOnScroll>
              <Box>
                <BookmarkCardCollection />
              </Box>
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
