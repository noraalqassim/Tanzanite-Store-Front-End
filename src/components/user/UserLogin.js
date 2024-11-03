import React, { useState } from "react";

import "./UserLogin.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
export default function UserLogIn() {
  const [userLogIn, setUserLogIn] = useState({
    email: "",
    password: "",
  });

  function onChangeHandlerEmailLogIn(event) {
    setUserLogIn({ ...userLogIn, email: event.target.value });
  }

  function onChangeHandlerPasswordLogIn(event) {
    setUserLogIn({ ...userLogIn, password: event.target.value });
  }

  const navigate = useNavigate();

  function logInUser() {
    const userUrlLogIn = "http://localhost:5125/api/v1/User/LogIn";

    // send req to backend
    axios
      .post(userUrlLogIn, userLogIn)
      .then((res) => {
        console.log(res, "response from log in");
        // token = res.data
        if (res.status === 200) {
          // save to local storage
          localStorage.setItem("token", res.data);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  }

  //show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, // Space between fields
        maxWidth: 500,
        margin: "auto",
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 2, 
        boxShadow: 2, 
      }}
    >
      <h1>Log In</h1>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={onChangeHandlerEmailLogIn}
        InputProps={{ className: "custom-text" }}
        InputLabelProps={{ className: "custom-text-field-label" }}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password" className="custom-text-field-label">
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={onChangeHandlerPasswordLogIn}
          className="custom-password-input custom-text"
        />
      </FormControl>
      <Button className="custom-button" onClick={logInUser}> LogIn</Button>
    </Box></div>
  );
}
