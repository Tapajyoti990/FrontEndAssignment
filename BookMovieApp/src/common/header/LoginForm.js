import React, { useState } from "react";
import { FormControl, InputLabel, Button, Input, Box } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
const LoginForm = (props) => {
  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    fetchUserIdAndPassword();
    setUserName("");
    setPassword("");
  };

  const fetchUserIdAndPassword = async () => {
    let key = window.btoa(userName + ":" + password);
    let authKey = `Basic ${key}`;
    try {
      const rawResponse = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: authKey,
        },
      });
      const response = await rawResponse.json();
      if (rawResponse.ok) {
        console.log("login response is");
        console.log(response);
        window.sessionStorage.setItem("isLoggedIn", true);
      } else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  return (
    <ValidatorForm onSubmit={submitHandler}>
      <FormControl>
        <InputLabel htmlFor="my-input_name">Username*</InputLabel>
        <Input
          required
          id="my-input_name"
          aria-describedby="my-helper-text"
          onChange={userNameChangeHandler}
          value={userName}
        />
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="my-input_password">Password*</InputLabel>
        <Input
          required
          id="my-input_password"
          aria-describedby="my-helper-text"
          type="password"
          onChange={passwordChangeHandler}
          value={password}
        />
      </FormControl>
      <Box component="div" sx={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 15,
          }}
        >
          Sign in
        </Button>
      </Box>
    </ValidatorForm>
  );
};

export default LoginForm;
