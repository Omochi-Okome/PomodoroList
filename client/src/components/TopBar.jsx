import { useNavigate } from "react-router-dom";
/* MaterialUI */
import { AppBar, Toolbar } from "@material-ui/core";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
/* MaterialUI icon */
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export default function TopBar({ user }) {
  const navigate = useNavigate();

  const handleListItemClick = (index) => {
    if (index === "logout") navigate("/auth/logout");
    if (index === "mypage") navigate("/mypage");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {user ? (
          <List
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ListItemButton onClick={() => handleListItemClick("logout")}>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
            <ListItemButton onClick={() => handleListItemClick("mypage")}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        ) : (
          <h3>Hello</h3>
        )}
      </Toolbar>
    </AppBar>
  );
}
