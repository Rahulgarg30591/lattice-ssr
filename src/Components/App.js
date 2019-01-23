import React, { Component } from 'react'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import classnames from 'classnames';
import { Widget } from '@latticejs/widgets';
import { CssBaseline } from '@material-ui/core';
import { LineChart, Line, ResponsiveContainer } from '@latticejs/mui-recharts';
import Dag from '@latticejs/dag';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Sunburst from '@latticejs/recharts-sunburst';
import Tree from '@latticejs/tree';
import { withStyles } from '@material-ui/core/styles';

if (!global.window ) {
  global.window = {};
}

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
  mainContainer2: {
    backgroundColor: '#898989',
    width: 300,
    height: 300,
  },
  mainContainerDag: {
    backgroundColor: '#898989',
    width: '100%',
    height: 600,
  },
  mainContainerLC: {
    backgroundColor: '#898989',
    paddingTop: '4%',
    width: '100%',
    height: 150,
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

class App extends Component {
  constructor(props) {
    super(props);

    this.getDAGConfig = this.getDAGConfig.bind(this);
    this.getTreeData = this.getTreeData.bind(this);
    this.getSunburstData = this.getSunburstData.bind(this);
    this.getLineData = this.getLineData.bind(this);

    this.state = {};
  }

  getDAGConfig() {
    return {
      title: "Package Dependencies",
      nodes: [
        { title: "app" },
        { title: "lodash" },
        { title: "react" },
        { title: "react-dom" },
        { title: "apollo" },
        { title: "enzyme" }
      ],
      edges: [
        {
          source: "app",
          target: "lodash"
        },
        {
          source: "app",
          target: "react"
        },
        {
          source: "app",
          target: "react-dom"
        },
        {
          source: "react",
          target: "react-dom"
        },
        {
          source: "app",
          target: "apollo"
        },
        {
          source: "app",
          target: "enzyme"
        }
      ],
      width: 600,
      height: 600,
    };
  }

  getSunburstData() {
    return [
      {
        children: [
          { name: 'Data', size: 20544 },
          { name: 'DataList', size: 19788 },
          { name: 'DataSprite', size: 10349 },
          { name: 'EdgeSprite', size: 3301 },
          { name: 'NodeSprite', size: 19382 },
          {
            name: 'render',
            children: [
              { name: 'ArrowType', size: 698 },
              { name: 'EdgeRenderer', size: 5569 },
              { name: 'IRenderer', size: 353 },
              { name: 'ShapeRenderer', size: 2247 }
            ]
          },
          { name: 'ScaleBinding', size: 11275 },
          { name: 'Tree', size: 7147 },
          { name: 'TreeBuilder', size: 9930 }
        ]
      }
    ];
  }

  getLineData() {
    return [
      {name: 'Page A', pv: 2400, amt: 2400},
      {name: 'Page B', pv: 1398, amt: 2210},
      {name: 'Page C', pv: 9800, amt: 2290},
      {name: 'Page D', pv: 3908, amt: 2000},
      {name: 'Page E', pv: 4800, amt: 2181},
      {name: 'Page F', pv: 3800, amt: 2500},
      {name: 'Page G', pv: 4300, amt: 2100},
    ];
  }

  getTreeData() {
    return [
      {
        label: "index.js"
      },
      {
        label: "demo",
        children: [
          {
            label: "file1.txt"
          },
          {
            label: "file2.txt"
          },
          {
            label: "examples",
            children: [
              {
                label: "example1.js"
              }
            ]
          }
        ]
      }
    ];
  }

  render () {
    const { classes } = this.props;
    const dagConfig = this.getDAGConfig();
    const sunburstData = this.getSunburstData();
    const treeData = this.getTreeData();
    const rechartsLineData = this.getLineData();

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
        </Grid>
        <Widget>
          <center className={classnames(classes.mainContainerLC)}>
            <LineChart width={300} height={100} data={rechartsLineData}>
              <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} isAnimationActive={false} />
            </LineChart>
          </center>
        </Widget>
        <Tree
          data={treeData}
          onCheckItem={item => console.log("Check: ", item)}
          onUnfoldItem={item => console.log("Unfold: ", item)}
          onFoldItem={item => console.log("Fold: ", item)}
          expandedAll
          cascadeCheck
        />
        <Widget>
          <div className={classnames(classes.mainContainerDag)} aspect={3}>
              <Dag
                 onClick={() => { console.log('clicked') }}
                 zoomEnable={true}
                 onEdgeClick={() => { console.log('Edge click') }}
                 onNodeClick={() => { console.log('Node click') }}
                 {...dagConfig}
               />
           </div>
        </Widget>
        <Widget>
          <ResponsiveContainer className={classnames(classes.mainContainer2)} aspect={5}>
            <Sunburst
              data={sunburstData}
              dataKey="size"
              fill="#00C49F"
              stroke="#fff"
              isAnimationActive={false}
              animationBegin={0}
              animationDuration={0}
            />
          </ResponsiveContainer>
        </Widget>
      </div>
    )
  }
}

export default withStyles(styles)(App);
//
// <Tree
//   data={treeData}
//   onCheckItem={item => console.log("Check: ", item)}
//   onUnfoldItem={item => console.log("Unfold: ", item)}
//   onFoldItem={item => console.log("Fold: ", item)}
//   expandedAll
//   cascadeCheck
// />
