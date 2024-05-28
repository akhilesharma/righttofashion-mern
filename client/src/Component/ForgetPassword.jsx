import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  let [user, setuser] = useState({
    password: "",
    cpassword: "",
  });
  var navigate = useNavigate();
  function getData(name, value) {
    setuser((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  }
  async function postData() {
    if (user.password === user.cpassword) {
      var item = {
        username: localStorage.getItem("resetuser"),
        password: user.password,
        otp: parseInt(localStorage.getItem("otp")),
      };
      var response = await fetch(`${baseURL}/resetpassword-password`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      });
      response = await response.json();
      if (response.result === "Done") {
        alert(response.message);
        localStorage.removeItem("otp");
        navigate("/login");
      } else alert(response.message);
    } else alert("Password and Confirm Password Does not Matched!!!!!");
  }
  return (
    <Grid container spacing={2}>
      <Grid item md={2} xs={12}></Grid>
      <Grid item md={8} xs={12}>
        <h5 className="background text-light text-center p-2">Login Section</h5>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "98%" },
          }}
          noValidate
          autoComplete="off">
          <TextField
            onChange={(e) => {
              getData(e.target.name, e.target.value);
            }}
            id="outlined-password-input"
            label="Password*"
            type="password"
            placeholder="Enter New Password"
            name="password"
          />
          <TextField
            onChange={(e) => {
              getData(e.target.name, e.target.value);
            }}
            id="outlined-password-input"
            label="Confirm Password*"
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
          />
          <Button variant="contained" className="background" onClick={postData}>
            Reset Password
          </Button>
        </Box>
      </Grid>
      <Grid item md={2} xs={12}></Grid>
    </Grid>
  );
}
