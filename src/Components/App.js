import React, { PureComponent } from 'react'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Widget } from '@latticejs/widgets';
import { CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.primary.contrastText
  },
  mainContainer: {
    backgroundColor: '#898989',
    height: '100%',
  },
  widget: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4
  },
  link: {
    color: theme.palette.text.secondary
  }
});

class App extends PureComponent {
  state = {}

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="subtitle1" color="inherit" className={classes.flex}>
              Basic Example
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.mainContainer}>
          <Grid item xs={12}>
            <Grid container justify="space-around" spacing={Number('16')}>
              <Grid item>
                <Widget className={classes.widget} title="Introduction" border="bottom">
                  <Typography variant="subtitle2">Welcome to Lattice</Typography>
                </Widget>
              </Grid>
              <Grid item>
                <Widget className={classes.widget} title="Material" border="bottom">
                  <Typography variant="subtitle2">Material UI integration</Typography>
                </Widget>
              </Grid>
              <Grid item>
                <Widget className={classes.widget} title="Recharts" border="bottom">
                  <Typography variant="subtitle2">with Material style</Typography>
                </Widget>
              </Grid>
              <Grid item>
                <Widget className={classes.widget} title="D3" border="bottom">
                  <Typography variant="subtitle2">React + D3 integration</Typography>
                </Widget>
              </Grid>
              <Grid item>
                <Widget className={classes.widget} title="React Virtualized" border="bottom">
                  <Typography variant="subtitle2">Infinite list support</Typography>
                </Widget>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" align="center">
              Want to learn more? Check the&nbsp;
              <a
                className={classes.link}
                href="https://github.com/latticejs/lattice"
                target="_blank"
                rel="noopener noreferrer"
              >
                docs
              </a>
              !
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(App);
