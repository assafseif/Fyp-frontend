import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CustomizedIconButton, CustomizedAppBar } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getfavorites } from "../../features/FavoriteSlice";
import FavoriteWindow from "../sections/FavoriteWindow";
import { isAdmin, isPermitted, removeToken } from "../../lib/token";

const pages = [
  { name: "HOME", slug: "/" },
  { name: "About", slug: "/about" },
];

const ResponsiveAppBar = (props, context) => {
  const loggedIn = isPermitted();
  !loggedIn && removeToken();

  const sets = isAdmin()
    ? [
        { name: "Change Pasword", slug: "/auth/changePassword" },
        { name: "My Posts", slug: "/post/my-posts" },
        { name: "Logout", slug: "/auth/logout" },
      ]
    : loggedIn
    ? [
        // { name: "Profile", slug: "/profile" },
        { name: "Change Password", slug: "/auth/changePassword" },
        { name: "Logout", slug: "/auth/logout" },
      ]
    : [
        { name: "Sign Up", slug: "/auth/signup" },
        { name: "Login", slug: "/auth/login" },
      ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfavorites());
  }, []);

  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const FavoriteClickOpen = () => {
    if (!loggedIn) {
      router.push("/auth/login");
      setOpen(false);
    }
    setOpen(true);
  };

  const FavoriteClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <CustomizedAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OUD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OUD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.slug}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box>
              <CustomizedIconButton>
                <p
                  style={{
                    color: "white",
                    position: "relative",
                    bottom: 12,
                    right: 6,
                    zIndex: 1,
                    width: "18px",
                    lineHeight: "18px",
                    borderRadius: "50%",
                    textAlign: "center",
                    fontSize: "12px",
                    border: " 2px solid #666",
                    borderColor: "white",
                    backgroundColor: "#b4813f",
                  }}
                >
                  {useSelector((state) => state.Favorite.favorites)?.posts?.length || 0}
                </p>
                <BookmarkBorderIcon
                  sx={{ position: "absolute", zIndex: "0" }}
                  onClick={FavoriteClickOpen}
                />
              </CustomizedIconButton>

              <Tooltip title="Open settings">
                <CustomizedIconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <MenuIcon />
                </CustomizedIconButton>
              </Tooltip>
            </Box>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {sets.map((setting, index) => (
                <MenuItem onClick={handleCloseUserMenu} key={index}>
                  <Link href={setting.slug}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <FavoriteWindow
        open={open}
        FavoriteClickOpen={FavoriteClickOpen}
        FavoriteClose={FavoriteClose}
      />
    </CustomizedAppBar>
  );
};

export default ResponsiveAppBar;
