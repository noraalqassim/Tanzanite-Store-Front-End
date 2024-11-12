import React from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { FaUsersCog } from "react-icons/fa";
import ListItemText from "@mui/material/ListItemText";
import { GiDiamondRing } from "react-icons/gi";
import { FaBox } from "react-icons/fa6";
import { LiaGemSolid } from "react-icons/lia";
import { LuListTodo } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";
import { MdOutlineMenuBook } from "react-icons/md";
export default function DrawerListDashBoard() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to="/users-dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <FaUsersCog style={{ fontSize: "25px", marginRight: "10px" }} />
              Users List
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/orders-dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <FaBox style={{ fontSize: "25px", marginRight: "10px" }} />
              Orders
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/jewelry-dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <GiDiamondRing
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              />
              Jewelry Product
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/gemstone-dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <LiaGemSolid style={{ fontSize: "25px", marginRight: "10px" }} />
              Gemstone Product
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/catigory-dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <LuShapes style={{ fontSize: "25px", marginRight: "10px" }} />
              Catigory Carving shape
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemButton>
              <LuListTodo style={{ fontSize: "25px", marginRight: "10px" }} />
              To-do List
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      <di
        style={{
          position: "absolute",
          top: 120,
          right: 80,
          fontSize: "30px",
          color: "#363637",
        }}
      >
        <MdOutlineMenuBook onClick={toggleDrawer(true)} />
      </di>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
