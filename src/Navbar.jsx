import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar({ loggedIn, onLogout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            B L OOOO G
          </Typography>

          {!loggedIn && (
            <>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                component={RouterLink}
                to="/login"
              >
                Log In
              </Button>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}

          {loggedIn && (
            <Button
              sx={{ mr: 2}}
              variant="contained"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}