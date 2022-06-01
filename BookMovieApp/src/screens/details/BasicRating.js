import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";

export default function BasicRating() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography variant="h6" component="div">
        Rate this movie:
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        variant="contained"
        icon={<StarBorderIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
}
