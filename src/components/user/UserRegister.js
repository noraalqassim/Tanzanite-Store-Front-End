import React, { useState } from "react";

import "./UserRegister.css";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
export default function UserRegister() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  console.log(userInfo, "user");

  function onChangeHandler(event) {
    setUserInfo({
      ...userInfo,
      [event.target.id]: event.target.value,
    });
  }
  console.log(userInfo, "user");

  const navigate = useNavigate();

  function registerNewUser() {
    const userUrl = "http://localhost:5125/api/v1/User/Register";

    axios
      .post(userUrl, userInfo)
      .then((res) => {
        console.log(res, "response form post");
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);

          if (error.response.status === 400) {
            if (error.response.data.errors.Name) {
              alert(error.response.data.errors.Name[0]);
              return;
            }
            if (error.response.data.errors.PhoneNumber) {
              alert(error.response.data.errors.PhoneNumber[0]);
              return;
            }
            if (error.response.data.errors.Email) {
              alert(error.response.data.errors.Email[0]);
              return;
            }
            if (error.response.data.errors.Password) {
              alert(error.response.data.errors.Password[0]);
              return;
            }
          }
          if (error.response.status === 500) {
            console.log({ error });
            alert("Internal server error. Please try again later.");
          }
        } else {
          console.error("Error", error.message);
        }
      });
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
    <div className="register">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2, 
          maxWidth: 500, 
          width: "100%", 
          margin: "auto",
          padding: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <h1>Register</h1>
        <TextField
          id="name"
          label="User Name"
          helperText="your name"
          variant="outlined"
          onChange={onChangeHandler}
          InputProps={{ className: "custom-text" }}
          InputLabelProps={{ className: "custom-text-field-label" }}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          helperText="+966012345678"
          variant="outlined"
          onChange={onChangeHandler}
          InputProps={{ className: "custom-text" }}
          InputLabelProps={{ className: "custom-text-field-label" }}
        />
        <TextField
          id="email"
          label="Email"
          helperText="youEmail@example.com"
          variant="outlined"
          onChange={onChangeHandler}
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
            onChange={onChangeHandler}
            className="custom-password-input custom-text"
          />
        </FormControl>
        <Button className="custom-button" onClick={registerNewUser}> Register</Button>

        <h6 className="have-acount">Already have an account? Log in here!</h6>
        <Link to="/login" className='login-link' >
          <button  className="custom-button2">Log In</button>
        </Link>
      </Box>
    </div>
  );
}
