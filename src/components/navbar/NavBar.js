import React, { useState } from "react";

import "./NavBar.css";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaUserAltSlash, FaTools } from "react-icons/fa";
import { FaRegUser, FaHeart, FaShoppingBasket } from "react-icons/fa";
import Badge from "@mui/material/Badge";
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
export default function NavBar(prop) {
  const { wishList, isAuthenticated, userData, cartList } = prop;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const arrayLength = wishList.length;
  const arrayCartLength = cartList.length;

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  //dashboard
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
    <div className="sticky-top">
      <div className="navbar-top">
        <div className="contact">
          {isAuthenticated && userData.role === "Admin" ? (
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                fontSize: "25px",
              }}
            >
              <FaTools onClick={toggleDrawer(true)} />
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Link>
          ) : (
            <p style={{ display: "none" }}>
              <FaTools />
            </p>
          )}
          <Link to="/contactUs" style={{ textDecoration: "none" }}>
            Contact Us
          </Link>
        </div>
        <div className="logo">
          <h3>Tanzanite Store</h3>
        </div>
        <div className="icons">
          <i>
            <Link to="/wishList">
              <Badge badgeContent={arrayLength} color="primary">
                <FaHeart style={{ color: "#373737" }} />
              </Badge>
            </Link>
          </i>
          <i>
            <Link to="/cart">
              <Badge badgeContent={arrayCartLength} color="primary">
                <FaShoppingBasket style={{ color: "#373737" }} />
              </Badge>
            </Link>
          </i>
          <i>
            {isAuthenticated ? (
              <Link to="/profile">
                <FaRegUser />
              </Link>
            ) : (
              <Link to="/login">
                <FaUserAltSlash />
              </Link>
            )}
          </i>
        </div>
      </div>
      <div className="main-content">
        <nav className="navbar navbar-expand-md" id="navbar-color">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
            >
              <span>
                <i>
                  <IoMenu />
                </i>
              </span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                isCollapsed ? "" : "show"
              }`}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/jewelry" className="nav-link">
                    Jewelry
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
