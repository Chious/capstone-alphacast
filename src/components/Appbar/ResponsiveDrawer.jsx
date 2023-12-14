import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";
import Image from "mui-image";
import AccountMenu from "./AccountMenu";
import { Stack } from "@mui/material";
import { BookmarkItem } from "./BookmarkItem/BookmarkItem";
import { useApp } from "../../contexts/AppContext";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import AddNewButton from "./BookmarkItem/AddNewButton";
import MoreVertMenu from "./BookmarkItem/MoreVertMenu";
import SimpleSnackbar from "../Modal/SimpleSnackbar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { bookmark } = useApp();
  const [editBookmark, setEditBookmark] = React.useState({
    target: null,
    edit: null,
    name: null,
    doublecheck: null,
  });

  // Control Morevert Menu
  const [moreVertPosition, setMoreVertPosition] = React.useState({
    open: false,
    xPosition: 0,
    yPosition: 0,
  });

  const [openNavigateModal, setOpenNavigateModal] = React.useState(false);

  const SideMenu = () => {
    const basic = [{ title: "📚Favirite", id: "/favorite" }];

    const bookmarkCards =
      (bookmark.length !== 0) & (bookmark !== undefined) ? (
        bookmark.map((bookmark, index) => (
          <BookmarkItem
            name={bookmark.name}
            id={bookmark.id}
            key={index}
            moreVertPosition={moreVertPosition}
            setMoreVertPosition={setMoreVertPosition}
            editBookmark={editBookmark}
            setEditBookmark={setEditBookmark}
          />
        ))
      ) : (
        <></>
      );

    return (
      <>
        <List>
          {basic.map((bookmark, index) => (
            <BookmarkItem
              name={bookmark.title}
              id={bookmark.id}
              key={index}
              moreVertPosition={moreVertPosition}
              setMoreVertPosition={setMoreVertPosition}
              editBookmark={editBookmark}
              setEditBookmark={setEditBookmark}
            />
          ))}
          {bookmarkCards}
        </List>
        <MoreVertMenu
          moreVertPosition={moreVertPosition}
          setMoreVertPosition={setMoreVertPosition}
          editBookmark={editBookmark}
          setEditBookmark={setEditBookmark}
          openNavigateModal={openNavigateModal}
          setOpenNavigateModal={setOpenNavigateModal}
        />
        <Stack width="100%" alignItems="center" justifyContent="center">
          <AddNewButton
            editBookmark={editBookmark}
            setEditBookmark={setEditBookmark}
          />
        </Stack>
      </>
    );
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: "#F6F7F8" }}>
        <Image src={logo} height="20%" width="80%" fit="contain" duration={0} />
      </Toolbar>
      <Divider />
      <SideMenu />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  //Greeting
  const now = new Date();

  const getGreeting = () => {
    const hours = now.getHours();

    if (hours >= 5 && hours <= 12) {
      return "早安";
    } else if (hours >= 12 && hours <= 17) {
      return "午安";
    } else if (hours >= 17 || hours <= 5) {
      return "晚安";
    }
  };
  const greeting = getGreeting();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        elevation={0}
      >
        <Toolbar sx={{ background: "white", color: "black" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            sx={{ p: 1 }}
          >
            <Typography variant="h6" noWrap component="div" fontWeight="900">
              {greeting}
            </Typography>
            <AccountMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F6F7F8",
              border: "1px solid transparent",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F6F7F8",
              border: "1px solid transparent",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100vw - ${drawerWidth}px)`,
          height: `calc(100vh - 70px)`,
        }}
      >
        {/* Apply Modal */}
        <DeleteModal
          editBookmark={editBookmark}
          setEditBookmark={setEditBookmark}
        />
        <EditModal
          editBookmark={editBookmark}
          setEditBookmark={setEditBookmark}
        />
        <SimpleSnackbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
