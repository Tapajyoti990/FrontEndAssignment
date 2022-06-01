import React, { useState, useEffect, useImperativeHandle } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { MenuProps, useStyles } from "./utils";

const CheckBoxInput = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
    props.selectDataHandler(value);
  };

  useImperativeHandle(ref, () => {
    return () => {
      setSelected([]);
    };
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dataRawResponse = await fetch(
      `${props["baseUrl"]}${props["urlString"]}`
    );
    if (dataRawResponse.ok) {
      const dataResponse = await dataRawResponse.json();
      console.log(dataResponse);
      setOptions(dataResponse[props["urlString"]]);
    } else {
      console.log("Data raw response not okay");
    }
  };

  return (
    <FormControl sx={{ mt: 5 }} className={classes.formControl}>
      <InputLabel id="mutiple-select-label">{props.name}</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option["id"]}
            value={`${option[props["identification"]]} ${
              option["last_name"] ? option["last_name"] : ""
            }`}
          >
            <ListItemIcon>
              <Checkbox
                checked={
                  selected.indexOf(
                    `${option[props["identification"]]} ${
                      option["last_name"] ? option["last_name"] : ""
                    }`
                  ) > -1
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={`${option[props["identification"]]} ${
                option["last_name"] ? option["last_name"] : ""
              }`}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default CheckBoxInput;
