import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import {
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import "./UserProfile.css";
export default function UserProfile(prop) {
  const { userData, setUserData, userAddres, setUserAddres } = prop;

  console.log("user data form profile:", userData);
  console.log("Addres Info form profile:", userAddres);

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
        if (res.status === 200) {
          alert("Profile updated successfully");
        }
      })
      .catch((error) => console.log(error));
  }

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);

  // Open the dialog
  const handleNameDialogOpen = () => {
    setOpenNameDialog(true);
  };
  const handleEmailDialogOpen = () => {
    setOpenEmailDialog(true);
  };
  const handlePhoneDialogOpen = () => {
    setOpenPhoneDialog(true);
  };

  // Close the dialog
  const handleNameDialogClose = () => {
    setOpenNameDialog(false);
  };
  const handleEmailDialogClose = () => {
    setOpenEmailDialog(false);
  };
  const handlePhoneDialogClose = () => {
    setOpenPhoneDialog(false);
  };

  //Address
  //http://localhost:5125/api/v1/Address --> create new Address

  // const [loadingUserAddres, setLoadingUserAddres] = useState(true);
  // const [userAddresError, setUserAddresError] = useState(null);
  // const [userAddres, setUserAddres] = useState([]);

  // const getUserAddresList = async () => {
  //   const token = localStorage.getItem("token");
  //   const url = "http://localhost:5125/api/v1/Address";

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUserAddres(response.data);
  //     setLoadingUserAddres(false);
  //     console.log("API User Addres Response:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching User Addres List from profile: ", error);
  //     setUserAddresError("Failed to fetch the User Addres from profile");
  //     setLoadingUserAddres(false);
  //   }
  // };

  // // Effect for User List
  // useEffect(() => {
  //   getUserAddresList();
  // }, []);
  // console.log(userAddres, "userAddres");

  return (
    <div className="user-profile-container">
      <div className="bkg-photo"></div>
      <div className="face-photo"></div>
      <h4 className="welcom">Welcome {userData.name}</h4>
      <div className="center-content">
        <div className="col-md-8 d-flex justify-content-center">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Name:</h6>
                </div>
                <div className="col-sm-6 text-secondary">{userData.name}</div>
                <div className="col-sm-3 text-teard">
                  <Button onClick={handleNameDialogOpen}>Edit</Button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email:</h6>
                </div>
                <div className="col-sm-6 text-secondary">{userData.email}</div>
                <div className="col-sm-3 text-teard">
                  <Button onClick={handleEmailDialogOpen}>Edit</Button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone Number:</h6>
                </div>
                <div className="col-sm-6 text-secondary">
                  {userData.phoneNumber}
                </div>
                <div className="col-sm-3 text-teard">
                  <Button onClick={handlePhoneDialogOpen}>Edit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* User name  */}
      <Dialog
        open={openNameDialog}
        onClose={handleNameDialogClose}
        maxWidth="sm"
        fullWidth
        style={{ paddingBottom: "20px" }}
      >
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent style={{ paddingTop: "20px" }}>
          <TextField
            maxWidth="sm"
            fullWidth
            variant="outlined"
            id="name"
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateUserProfile();
              handleNameDialogClose();
            }}
          >
            Save
          </Button>
          <Button onClick={handleNameDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Email */}
      <Dialog
        open={openEmailDialog}
        onClose={handleEmailDialogClose}
        maxWidth="sm"
        fullWidth
        style={{ paddingBottom: "20px" }}
      >
        <DialogTitle>Edit Email</DialogTitle>
        <DialogContent style={{ paddingTop: "20px" }}>
          <TextField
            maxWidth="sm"
            fullWidth
            variant="outlined"
            id="email"
            label="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateUserProfile();
              handleEmailDialogClose();
            }}
          >
            Save
          </Button>
          <Button onClick={handleEmailDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* phone number */}
      <Dialog
        open={openPhoneDialog}
        onClose={handlePhoneDialogClose}
        maxWidth="sm"
        fullWidth
        style={{ paddingBottom: "20px" }}
      >
        <DialogTitle>Edit Phone Number</DialogTitle>
        <DialogContent style={{ paddingTop: "20px" }}>
          <TextField
            maxWidth="sm"
            fullWidth
            variant="outlined"
            id="phoneNumber"
            label="Phone Number"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateUserProfile();
              handlePhoneDialogClose();
            }}
          >
            Save
          </Button>
          <Button onClick={handlePhoneDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <h4>Your Address</h4>
      <div className="center-content">
        <div className="col-md-8 d-flex justify-content-center addres-table">
          <div className="card mb-7 p-3">
            <div className="card-body">
              {userAddres.length > 0 && (
                <div>
                  <div className="row">
                    <div className="ccol-sm-12">
                      <h6 className="mb-0">Street:</h6>
                    </div>
                    <div className="col-sm-12 text-secondary">
                      {userAddres[0].street}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <h6 className="mb-0 ">City:</h6>
                    </div>
                    <div className="col-sm-12 text-secondary">
                      {userAddres[0].city}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <h6 className="mb-0 ">County:</h6>
                    </div>
                    <div className="col-sm-12 text-secondary">
                      {userAddres[0].county}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <h6 className="mb-0 ">ZipCode:</h6>
                    </div>
                    <div className="col-sm-12 text-secondary">
                      {userAddres[0].zipCode}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Addres */}
      <Link to="Addres"> Add your addres</Link>
      <Outlet />
      <br />
      <br />

      {/* Log out */}
      <Button
        variant="contained"
        className="user-profile-button"
        onClick={logOutHandler}
      >
        Log out
      </Button>
      <br />
      <br />
      <br />
      <br />
            <br />
      </div>
  );
}
