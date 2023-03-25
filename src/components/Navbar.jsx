import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UserContext from "../contexts/UserContext";

export default function Navbar(props) {
  const { user, onLogout } = React.useContext(UserContext);
  return (
      <AppBar position="static">
        <Toolbar>
          {user ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => props.setCollapsed(!props.collapsed)}>
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movizrate Admin
          </Typography>
          {user ? (
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
  );
}
