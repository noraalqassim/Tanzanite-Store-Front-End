import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";

import "./UserProfile.css";
export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  console.log("user data form profile:", userData);
  console.log(userData, "userData from profile");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [newName, setNewName] = useState(userData.name);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(userData.phoneNumber);

  function updateUserProfile() {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:5125/api/v1/User/UpdateProfile/${userData.userId}`,
        {
          name: newName,
          email: newEmail,
          phoneNumber: newPhoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUserData(res.data);
        setAnchorEl(null);
      })
      .catch((error) => console.log(error));
  }

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  const [namePopoverOpen, setNamePopoverOpen] = useState(false);
  const [emailPopoverOpen, setEmailPopoverOpen] = useState(false);
  const [phonePopoverOpen, setPhonePopoverOpen] = useState(false);

  const handleNamePopoverOpen = () => {
    setNamePopoverOpen(true);
  };

  const handleEmailPopoverOpen = () => {
    setEmailPopoverOpen(true);
  };

  const handlePhonePopoverOpen = () => {
    setPhonePopoverOpen(true);
  };

  const handleNamePopoverClose = () => {
    setNamePopoverOpen(false);
  };

  const handleEmailPopoverClose = () => {
    setEmailPopoverOpen(false);
  };

  const handlePhonePopoverClose = () => {
    setPhonePopoverOpen(false);
  };

  const namePopoverId = namePopoverOpen ? "name-popover" : undefined;
  const emailPopoverId = emailPopoverOpen ? "email-popover" : undefined;
  const phonePopoverId = phonePopoverOpen ? "phone-popover" : undefined;

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <form className="user-profile-form">
        <div className="user-profile-field">
          <Typography>Name: {userData.name}</Typography>
          <Button onClick={handleNamePopoverOpen}>Edit</Button>
        </div>
        <Popover
          id={namePopoverId}
          open={namePopoverOpen}
          onClose={handleNamePopoverClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 200, left: 400 }}
        >
          <TextField
            variant="filled"
            id="name"
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button
            onClick={() => {
              updateUserProfile();
              handleNamePopoverClose();
            }}
          >
            Save
          </Button>
        </Popover>

        <div className="user-profile-field">
          <Typography>Email: {userData.email}</Typography>
          <Button onClick={handleEmailPopoverOpen}>Edit</Button>
        </div>
        <Popover
          id={emailPopoverId}
          open={emailPopoverOpen}
          onClose={handleEmailPopoverClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 200, left: 400 }}
        >
          <TextField
            variant="filled"
            id="email"
            label="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button
            onClick={() => {
              updateUserProfile();
              handleEmailPopoverClose();
            }}
          >
            Save
          </Button>
        </Popover>
        <div className="user-profile-field">
          <Typography>Phone Number: {userData.phoneNumber}</Typography>
          <Button onClick={handlePhonePopoverOpen}>Edit</Button>
        </div>
        <Popover
          id={phonePopoverId}
          open={phonePopoverOpen}
          onClose={handlePhonePopoverClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 200, left: 400 }}
        >
          <TextField
            variant="filled"
            id="phoneNumber"
            label="Phone Number"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
          <Button
            onClick={() => {
              updateUserProfile();
              handlePhonePopoverClose();
            }}
          >
            Save
          </Button>
        </Popover>
      {/* <Link to="create-new-Jewelry">Create new Jewelry</Link>
      <Outlet/> */}
        <Button
          variant="contained"
          className="user-profile-button"
          onClick={logOutHandler}
        >
          Log out
        </Button>
      </form>
    </div>
  );
}
