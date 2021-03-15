import React from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import "./errorPage.css";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  componentGrid: {
    backgroundColor: "whitesmoke",
    padding: "20px",
    border: "0",
  },
  homeButton: {
    backgroundColor: "#298155",
    textDecoration: "none",
    width: "50%",
    alignSelf: "center",
  },
}));

export const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className='errorContainer'>
      <Grid container className={classes.mainGrid}>
        <Grid
          item
          xs={8}
          md={5}
          component={Card}
          className={classes.componentGrid}
          elevation={0}
        >
          <CardContent>
            <StaticImage
              className='errorImage'
              src='../../asserts/logo1.png'
              alt='LandingImage'
              placeholder='tracedSVG'
            />
          </CardContent>
        </Grid>
        <Grid
          item
          xs={8}
          md={5}
          component={Card}
          className={classes.componentGrid}
          elevation={0}
        >
          <CardContent className='errorContent'>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              className='errorTitle'
            >
              CRUD
            </Typography>
            <Typography variant='h6' gutterBottom className='errorDetail'>
              It seems you are lost.
            </Typography>
            <Typography variant='h6' gutterBottom className='errorDetail'>
              Kindly navigate to home page and start again.
            </Typography>
            <Button
              variant='contained'
              className={classes.homeButton}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
