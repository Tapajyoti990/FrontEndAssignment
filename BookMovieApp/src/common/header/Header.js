import "./Header.css";
import React from "react";
import logo from "./../../assets/logo.svg";
import Button from "@mui/material/Button";
import { useState } from "react";
import Login from "./Login";
const Header = (props) => {
  const [refresh, setRefresh] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  console.log("Show login is " + showLogin);
  return (
    <div>
      <div className="header">
        <div>
          <img src={logo} alt="My logo" id="movieLogo" />
        </div>
        <div>
          {props["bookShowVisible"] && (
            <Button
              variant="contained"
              sx={{
                color: "primary",
                mr: 1,
              }}
              onClick={() => {
                if (window.sessionStorage.getItem("isLoggedIn")) {
                  console.log("Inside book my show");
                  console.log(props.paramId);
                  props.history.push({
                    pathname: "/bookshow/" + props.paramId,
                  });
                } else {
                  setShowLogin(true);
                }
              }}
            >
              Book My Show
            </Button>
          )}
          {!window.sessionStorage.getItem("isLoggedIn") && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#faf5f5",
                color: "black",
              }}
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </Button>
          )}
          {window.sessionStorage.getItem("isLoggedIn") && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#faf5f5",
                color: "black",
              }}
              onClick={() => {
                setRefresh({});
                window.sessionStorage.clear("isLoggedIn");
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      {showLogin && (
        <Login
          baseUrl={props["baseUrl"]}
          onClose={() => {
            setShowLogin(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;
