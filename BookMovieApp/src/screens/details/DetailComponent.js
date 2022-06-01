import Typography from "@mui/material/Typography";
import React from "react";
import { AudioCard, VideoCard } from "material-ui-player";
const DetailComponent = (props) => {
  const displayGenres = () => {
    let genreArr = props.movie["genres"];
    if (genreArr) {
      console.log(genreArr);
      return props.movie["genres"].join(",");
    }
  };

  const displayDuration = () => {
    let duration = props.movie["duration"];
    if (duration) {
      return duration;
    }
  };

  const displayReleaseDate = () => {
    let releaseDate = props.movie["release_date"];
    if (releaseDate) {
      let dateArr = new Date(releaseDate).toString().split(" ");
      dateArr.splice(4, 5);
      return dateArr.join(" ");
    }
  };

  const displayRating = () => {
    let rating = props.movie["rating"];
    if (rating) {
      return rating;
    }
  };

  const getLink = () => {
    let trailerUrl = props.movie["trailer_url"];
    if (trailerUrl) {
      let lastElement = trailerUrl.split("/").pop();
      let id = lastElement.split("?v=").pop();
      console.log(id);
      let url = `https://youtube.com/embed/${id}/autoplay=0`;
      return url;
    }
  };
  const getStoryLine = () => {
    const storyLine = props.movie["storyline"];
    if (storyLine) {
      return storyLine;
    }
  };
  const getWikiLink = () => {
    const link = props.movie["wiki_url"];
    if (link) {
      return link;
    }
  };
  return (
    <React.Fragment>
      <Typography variant="headline" component="h2" gutterBottom>
        {props.movie["title"]}
      </Typography>
      <div>
        <Typography variant="h6" gutterBottom component="span">
          Genre:
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          {displayGenres()}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" gutterBottom component="span">
          Duration:
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          {displayDuration()}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" gutterBottom component="span">
          Release Date:
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          {displayReleaseDate()}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" gutterBottom component="span">
          Rating:
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          {displayRating()}
        </Typography>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6" gutterBottom component="span">
          Plot:
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          <a href={`${getWikiLink()}`}>(Wiki Link)</a>
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="span">
          {getStoryLine()}
        </Typography>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6" gutterBottom component="span">
          Trailer:
        </Typography>
      </div>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        style={{ borderStyle: "none", width: "90%", height: "80%" }}
        src={getLink()}
      ></iframe>
    </React.Fragment>
  );
};

export default DetailComponent;
