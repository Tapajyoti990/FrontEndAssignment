import React from "react";
//import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../common/header/Header";
import BookShow from "../screens/bookshow/BookShow";
import Home from "./home/Home";
//import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () => {
  const baseUrl = "/api/v1/";

  return (
    <div>
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} baseUrl={baseUrl} />}
          />
          <Route
            path="/movie/:id"
            render={(props) => <Details {...props} baseUrl={baseUrl} />}
          />
          <Route
            path="/bookshow/:id"
            render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
          />
          {/* <Route
            path="/confirm/:id"
            render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
          /> */}
        </div>
      </Router>
    </div>
  );
};

export default Controller;
