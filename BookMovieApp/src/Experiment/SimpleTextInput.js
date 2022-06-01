import React, { useState, useImperativeHandle } from "react";
import { FormControl, InputLabel, Input } from "@mui/material";
const SimpleTextInput = React.forwardRef((props, ref) => {
  const [movie, setMovie] = useState("");

  const changeMovie = (event) => {
    setMovie(event.target.value);
    props.changeMovieName(event.target.value);
  };

  useImperativeHandle(ref, () => {
    return () => {
      setMovie("");
    };
  });

  return (
    <FormControl>
      <InputLabel htmlFor="my-input_name">Movie Name</InputLabel>
      <Input
        id="my-input_name"
        aria-describedby="my-helper-text"
        onChange={changeMovie}
        value={movie}
      />
    </FormControl>
  );
});

export default SimpleTextInput;
