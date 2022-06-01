import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@mui/material/Typography";
import "./Details.css";
import DetailComponent from "./DetailComponent";
import BasicRating from "./BasicRating";
import WrappedArtists from "./ArtistComponent";

const Details = (props) => {
  console.log(props.match.params.id);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const rawResponse = await fetch(
      props["baseUrl"] + "movies/" + props.match.params.id
    );
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      console.log(response);
      setMovie(response);
    }
  };

  const clickHandler = () => {
    props.history.push({
      pathname: "/",
    });
  };
  return (
    <div>
      <Header
        bookShowVisible={true}
        paramId={props.match.params.id}
        history={props.history}
      />
      <Typography
        variant="div"
        display="block"
        // gutterBottom
        component="div"
        className="homeButton"
        onClick={clickHandler}
        sx={{ mt: "8px", ml: "24px" }}
      >
        {`< Back To Home`}
      </Typography>
      <div className="detailContainer">
        <div className="childContainer1">
          <img
            src={movie["poster_url"]}
            alt={movie["title"]}
            className="movieImage"
          ></img>
        </div>
        <div className="childContainer2">
          <DetailComponent movie={movie} />
        </div>
        <div className="childContainer3">
          <BasicRating />
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ mt: "16px" }}
          >
            Artists:
          </Typography>
          <WrappedArtists movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default Details;
