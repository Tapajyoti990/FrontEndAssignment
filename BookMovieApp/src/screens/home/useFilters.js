import React, { useState } from "react";

const useFilters = () => {
  console.log("inside custom hook");
  const [movie, setMovie] = useState("");
  const movieNameHandler = (inputMovie) => {
    console.log("input movie is " + inputMovie);
    setMovie(inputMovie);
  };
  const genreHandler = () => {};
  const artistHandler = () => {};
  const startDateHandler = () => {};
  const endDateHandler = () => {};

  return {
    movie,
    movieNameHandler,
    genreHandler,
    artistHandler,
    startDateHandler,
    endDateHandler,
  };
};

export default useFilters;
