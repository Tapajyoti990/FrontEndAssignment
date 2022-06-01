import React, { useEffect, useState, useRef } from "react";
import Select from "@material-ui/core/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FormControl, InputLabel, Input } from "@mui/material";
import CheckBoxInput from "../../Experiment/CheckBoxInput";
import WrappedDatePicker from "../../Experiment/DatePicker";
import useFilters from "./useFilters";
import SimpleTextInput from "../../Experiment/SimpleTextInput";

const FormCard = (props) => {
  let genres = [];
  let artists = [];
  let movieName = "";
  let releasedStartDate = "";
  let releasedEndDate = "";
  let resetStartDate = "";
  let resetEndDate = "";
  const movieInputRef = useRef();
  const genreInputRef = useRef();
  const artistInputRef = useRef();

  const changeMovieName = (movie) => {
    movieName = movie;
  };

  const resetStartDateHandler = (callback) => {
    resetStartDate = callback;
  };

  const resetEndDateHandler = (callback) => {
    resetEndDate = callback;
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const movieFilter = {
      movieName,
      genres,
      artists,
      releasedStartDate,
      releasedEndDate,
    };

    props.filterMovies(movieFilter);
  };

  const changeGenreHandler = (genreArr) => {
    console.log("genreArr is ");
    console.log(genreArr);
    genres = genreArr;
  };

  const changeArtistsHandler = (artistArr) => {
    console.log("Artist arr is ");
    console.log(artistArr);
    artists = artistArr;
  };

  const pickReleaseStartDate = (startDate) => {
    releasedStartDate = startDate;
  };

  const pickReleaseEndDate = (endDate) => {
    releasedEndDate = endDate;
  };
  return (
    <Card sx={{ minWidth: 240 }}>
      <CardContent>
        <Typography
          component="div"
          sx={{ fontSize: 14, color: "blue", marginBottom: 5 }}
        >
          FIND MOVIES BY:
        </Typography>
        <Typography component="div">
          <ValidatorForm onSubmit={submitHandler}>
            <SimpleTextInput
              changeMovieName={changeMovieName}
              ref={movieInputRef}
            />
            <CheckBoxInput
              name="Genres"
              ref={genreInputRef}
              urlString="genres"
              baseUrl={props["baseUrl"]}
              identification="genre"
              selectDataHandler={changeGenreHandler}
            />
            <CheckBoxInput
              ref={artistInputRef}
              name="Artists"
              urlString="artists"
              baseUrl={props["baseUrl"]}
              identification="first_name"
              selectDataHandler={changeArtistsHandler}
            />
            {/* <CheckBoxInput name="Artists" /> */}
            <FormControl sx={{ mt: 5 }}>
              <WrappedDatePicker
                period="start"
                changeDate={pickReleaseStartDate}
                resetDate={resetStartDateHandler}
              />
            </FormControl>

            <FormControl sx={{ mt: 5 }}>
              <WrappedDatePicker
                period="end"
                changeDate={pickReleaseEndDate}
                resetDate={resetEndDateHandler}
              />
            </FormControl>

            <Box component="div" sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 5,
                  width: 300,
                }}
              >
                Apply
              </Button>
            </Box>
          </ValidatorForm>
        </Typography>
      </CardContent>
      {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
    </Card>
  );
};

export default FormCard;
