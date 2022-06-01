import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "./FormCard";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    //height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});

const ReleasedMovies = (props) => {
  console.log("Released Movies are " + props.movies);
  const { classes } = props;
  return (
    <div>
      <div className={classes.root}>
        <GridList
          cellHeight={350}
          className={classes.gridList}
          cols={props["movies"].length < 4 ? props["movies"].length : 4}
        >
          {/* <GridListTile
            key="Subheader"
            cols={4}
            style={{ height: 350 }}
          ></GridListTile> */}
          {props.movies.map((tile) => (
            <GridListTile
              key={props.movies.indexOf(tile)}
              style={{ height: 350 }}
              cols={1}
            >
              <Link to={`/movie/${tile["id"]}`}>
                <img src={tile["poster_url"]} alt={tile["title"]} />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

ReleasedMovies.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedReleasedMovies = withStyles(styles)(ReleasedMovies);
export default WrappedReleasedMovies;
