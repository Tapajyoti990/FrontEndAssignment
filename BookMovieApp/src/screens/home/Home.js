import React, { useEffect, useState } from "react";
import Header from "./../../common/header/Header";
import UpcomingMovies from "./UpcomingMovies";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Home.css";
import WrappedReleasedMovies from "./ReleasedMovies";
import FormCard from "./FormCard";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  imageFit: {
    //width: 400,
    //height: 250,
    "object-fit": "contain",
  },
});
let upcomingMovies = [];
let releasedMovies = [];
const Home = (props) => {
  const [releasedState, setRelesedState] = useState([]);
  const [upcomingState, setUpcomingState] = useState([]);
  useEffect(() => {
    upcomingMovies = [];
    releasedMovies = [];
    fetchResponse();
  }, []);

  const fetchResponse = async () => {
    const rawResponse = await fetch(`${props["baseUrl"]}movies?limit=17`);
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      for (let movie of response["movies"]) {
        if (movie["status"] === "RELEASED") {
          releasedMovies.push(movie);
        } else if (movie["status"] === "PUBLISHED") {
          upcomingMovies.push(movie);
        }
      }
    }

    upcomingMovies.forEach((movie) => {
      console.log(movie["title"] + " " + movie["poster_url"]);
    });
    releasedMovies.forEach((movie) => {
      console.log(movie["title"] + " " + movie["poster_url"]);
    });
    setUpcomingState(upcomingMovies);
    setRelesedState(releasedMovies);
  };

  const filterMoviesHandler = (movieFilter) => {
    // const movieFilter = {
    //   movieName,
    //   genres,
    //   artists,
    //   releasedStartDate,
    //   releasedEndDate,
    // }

    const filterArr = releasedMovies.filter((randomMovie) => {
      return (
        filterMoviesByName(randomMovie, movieFilter["movieName"]) &&
        filterMoviesByGenres(randomMovie, movieFilter["genres"]) &&
        filterMoviesByArtists(randomMovie, movieFilter["artists"]) &&
        filterByDate(
          randomMovie,
          movieFilter["releasedStartDate"],
          movieFilter["releasedEndDate"]
        )
      );
    });
    setRelesedState(filterArr);
  };

  const filterByDate = (movie, startDate, endDate) => {
    if (startDate === "" && endDate === "") {
      return true;
    }
    let date = new Date(movie["release_date"]);
    if (startDate !== "" && endDate !== "") {
      let date1 = new Date(startDate);
      let date2 = new Date(endDate);

      if (date - date1 >= 0 && date2 - date >= 0) {
        return true;
      } else {
        return false;
      }
    }
    if (startDate != "") {
      let date1 = new Date(startDate);
      if (date - date1 >= 0) {
        return true;
      } else {
        return false;
      }
    }
    if (endDate != "") {
      let date2 = new Date(endDate);
      if (date2 - date >= 0) {
        return true;
      } else {
        return false;
      }
      return false;
    }
  };
  const filterMoviesByArtists = (movie, artistArr) => {
    if (artistArr.length === 0) {
      return true;
    }
    for (let movieArtist of movie["artists"]) {
      for (let artist of artistArr) {
        let str = movieArtist["first_name"] + " " + movieArtist["last_name"];
        if (str === artist.trim()) {
          return true;
        }
      }
    }
    return false;
  };
  const filterMoviesByName = (movie, movieName) => {
    if (movieName.trim() === "") {
      return true;
    }
    return movie["title"] === movieName;
  };
  const filterMoviesByGenres = (movie, genreArr) => {
    console.log("Genre Array is");
    console.log(genreArr);
    if (genreArr.length === 0) {
      return true;
    }
    for (let movieGenre of movie["genres"]) {
      for (let genre of genreArr) {
        console.log(movieGenre + " " + genre);
        if (movieGenre.trim() === genre.trim()) {
          return true;
        }
      }
    }
    return false;
  };

  const { classes } = props;

  return (
    <div>
      <Header bookShowVisible={false} baseUrl={props["baseUrl"]} />
      <UpcomingMovies />
      <div className={classes.root}>
        <GridList cellHeight={250} className={classes.gridList} cols={6}>
          {upcomingState.map((tile) => (
            <GridListTile key={tile["id"]} cols={2}>
              <img
                src={tile["poster_url"]}
                alt={tile["title"]}
                className={classes["imageFit"]}
              />
              <GridListTileBar
                title={tile["title"]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="homeContainer">
        <div className="seventySix">
          <WrappedReleasedMovies movies={releasedState} />
        </div>
        <div className="twentyFour">
          <FormCard
            baseUrl={props["baseUrl"]}
            filterMovies={filterMoviesHandler}
          />
        </div>
      </div>
    </div>
  );
};

Home.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedHome = withStyles(styles)(Home);
export default WrappedHome;
