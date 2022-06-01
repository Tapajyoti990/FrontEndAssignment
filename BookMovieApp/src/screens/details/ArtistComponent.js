import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
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
  title: {
    color: theme.palette.background.paper, //theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

const ArtistComponent = (props) => {
  const { classes } = props;
  console.info(props.movie);
  return (
    <div>
      {props["movie"].artists && (
        <div className={classes.root}>
          <GridList
            // cellHeight={350}
            className={classes.gridList}
            cols={
              props.movie["artists"].length < 2
                ? props["movie"]["artists"].length
                : 2
            }
          >
            {/* <GridListTile
                key="Subheader"
                cols={4}
                style={{ height: 350 }}
              ></GridListTile> */}
            {props.movie.artists.map((tile) => (
              <GridListTile
                key={props.movie.artists.indexOf(tile)}
                // style={{ height: 350 }}
                cols={1}
              >
                <img src={tile["profile_url"]} alt={tile["first_name"]} />

                <GridListTileBar
                  title={tile["first_name"] + " " + tile["last_name"]}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )}
    </div>
  );
};

ArtistComponent.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedArtists = withStyles(styles)(ArtistComponent);
export default WrappedArtists;
