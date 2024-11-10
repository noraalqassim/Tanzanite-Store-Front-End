import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function UserAddres(prop) {
  const { userData } = prop;
  //http://localhost:5125/api/v1/Address

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const [AddresInfo, setAddresInfo] = useState({
    street: "",
    city: "",
    county: "",
    zipCode: "",
    userId: userData.userId,
  });

  function onChangeHandler(event) {
    setAddresInfo({
      ...AddresInfo,
      [event.target.id]: event.target.value,
    });
  }

  console.log("Addres Info from userAddres", AddresInfo);

  // send request to backend
  function CreateNewAddres() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/Address";
    axios
      .post(url, AddresInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Addres is created successfully ");
          // Clear the form fields
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400){
          alert("Invalid ZipCode format. Please enter a valid ZipCode. Five digits only, like 12345");
        }
      });
  }
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "70px",
            marginLeft: "auto",
          }}
        >
          <Button
            onClick={functionopenpopup}
            color="success"
            variant="contained"
          >
            Create New Jewelry
          </Button>
        </div>
        <Dialog
          // fullScreen
          open={open}
          onClose={closepopup}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Add Your Addres information
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                id="street"
                onChange={onChangeHandler}
                variant="outlined"
                label="Street"
              ></TextField>
              <TextField
                id="city"
                onChange={onChangeHandler}
                variant="outlined"
                label="City"
              ></TextField>
              <TextField
                id="county"
                onChange={onChangeHandler}
                variant="outlined"
                label="County"
              ></TextField>

              <TextField
                id="zipCode"
                onChange={onChangeHandler}
                variant="outlined"
                label="ZipCode"
              ></TextField>

              <Button
                onClick={CreateNewAddres}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
