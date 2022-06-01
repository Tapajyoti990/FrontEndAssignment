import React, { useReducer, useState } from "react";
import {
  FormControl,
  InputLabel,
  Button,
  Input,
  Box,
  Typography,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const reducerFn = (state, action) => {
  if (action.TYPE === "firstNameChange") {
    return {
      ...state,
      firstName: action["payload"],
    };
  } else if (action.TYPE === "lastNameChange") {
    return {
      ...state,
      lastName: action["payload"],
    };
  } else if (action.TYPE === "emailChange") {
    return {
      ...state,
      email: action["payload"],
    };
  } else if (action.TYPE === "passwordChange") {
    return {
      ...state,
      password: action["payload"],
    };
  } else if (action.TYPE === "contactNoChange") {
    return {
      ...state,
      contactNo: action["payload"],
    };
  } else if (action.TYPE === "RESET") {
    return {
      ...action["payload"],
    };
  }
  return state;
};

const RegisterForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNo: "",
  };
  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const submitChangeHandler = (event) => {
    event.preventDefault();
    console.log("Inside Register form submit area");
    console.log(state);
    let decider =
      state.firstName.trim() !== "" &&
      state.lastName.trim() !== "" &&
      state.email.trim() !== "" &&
      state.password.trim() !== "" &&
      state.contactNo.trim() !== "";

    if (decider) {
      registerData();
      dispatchFn({
        TYPE: "RESET",
        payload: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          contactNo: "",
        },
      });
      setShowSuccess(true);
      setShowFailure(false);
    } else {
      setShowFailure(true);
    }
  };

  const registerData = async () => {
    const params = {
      email_address: state["email"],
      first_name: state["firstName"],
      last_name: state["lastName"],
      mobile_number: state["contactNo"],
      password: state["password"],
    };

    try {
      const rawResponse = await fetch("/api/v1/signup", {
        body: JSON.stringify(params),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      const response = await rawResponse.json();
      if (rawResponse.ok) {
        console.log("response is");
        console.log(response);
      } else {
        const error = new Error();
        error.message = response.message || "Something went wrong.";
        throw error;
      }
    } catch (error) {
      console.log("we are facing error");
      alert(error.message);
    }
  };

  const firstNameChangeHandler = (event) => {
    dispatchFn({ TYPE: "firstNameChange", payload: event.target.value });
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const lastNameChangeHandler = (event) => {
    dispatchFn({ TYPE: "lastNameChange", payload: event.target.value });
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const emailChangeHandler = (event) => {
    dispatchFn({ TYPE: "emailChange", payload: event.target.value });
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const passwordChangeHandler = (event) => {
    dispatchFn({ TYPE: "passwordChange", payload: event.target.value });
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const contactNoChangeHandler = (event) => {
    dispatchFn({ TYPE: "contactNoChange", payload: event.target.value });
    if (showSuccess) {
      setShowSuccess(false);
    }
  };
  return (
    <ValidatorForm onSubmit={submitChangeHandler}>
      <FormControl>
        <InputLabel htmlFor="my-input_name">FirstName*</InputLabel>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          onChange={firstNameChangeHandler}
          value={state.firstName}
        />
        {showFailure && state.firstName.trim() === "" && (
          <Typography variant="p" component="div" sx={{ color: "red" }}>
            required
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="my-input_name">LastName*</InputLabel>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          onChange={lastNameChangeHandler}
          value={state.lastName}
        />
        {showFailure && state.lastName.trim() === "" && (
          <Typography variant="p" component="div" sx={{ color: "red" }}>
            required
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="my-input_name">Email*</InputLabel>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={emailChangeHandler}
          value={state.email}
        />
        {showFailure && state.email.trim() === "" && (
          <Typography variant="p" component="div" sx={{ color: "red" }}>
            required
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="my-input_name">Password*</InputLabel>
        <Input
          id="password"
          type="password"
          name="password"
          onChange={passwordChangeHandler}
          value={state.password}
        />
        {showFailure && state.password.trim() === "" && (
          <Typography variant="p" component="div" sx={{ color: "red" }}>
            required
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="my-input_name">Contact No.*</InputLabel>
        <Input
          id="contactNo"
          type="text"
          name="contactNo"
          onChange={contactNoChangeHandler}
          value={state.contactNo}
        />
        {showFailure && state.contactNo.trim() === "" && (
          <Typography variant="p" component="div" sx={{ color: "red" }}>
            required
          </Typography>
        )}
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
          REGISTER
        </Button>
      </Box>
      {showSuccess && (
        <Typography variant="p" component="div">
          Registration Successful. Please Login!
        </Typography>
      )}
    </ValidatorForm>
  );
};

export default RegisterForm;
