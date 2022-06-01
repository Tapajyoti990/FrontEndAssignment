import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const DatePickers = (props) => {
  const { classes } = props;
  const [date, setDate] = useState("");
  props.resetDate(setDate);
  let label = "Release Date " + props["period"];
  const dateChangeHandler = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
    props.changeDate(event.target.value);
  };
  return (
    <div className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue="2017-24-05"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={dateChangeHandler}
      />
    </div>
  );
};

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedDatePicker = withStyles(styles)(DatePickers);

export default WrappedDatePicker;
