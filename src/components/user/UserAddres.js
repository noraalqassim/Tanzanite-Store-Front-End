import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Button, Box, Stack, TextField } from "@mui/material";

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

  const navigate = useNavigate();
  
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
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          alert(
            "Invalid ZipCode format. Please enter a valid ZipCode. Five digits only, like 12345"
          );
        }
      });
  }
  return (
    <div
      style={{
        width: "900px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h3>Add Your Addres information</h3>
      <Box>
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

          <Button onClick={CreateNewAddres} color="primary" variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
