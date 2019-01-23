import React, { Component } from "react";
import Tree from "@latticejs/tree";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

class TreeComp extends Component {

  createTheme = () => {
    debugger;
    return createMuiTheme({ palette: { type: 'dark' }});
  }

  state = {
    treeData: [
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
    ]
  };

  render() {
    const { treeData } = this.state;
    debugger;
    return (
      <MuiThemeProvider theme={this.createTheme()}>
        <CssBaseline />
        <Tree
          data={treeData}
          onCheckItem={item => console.log("Check: ", item)}
          onUnfoldItem={item => console.log("Unfold: ", item)}
          onFoldItem={item => console.log("Fold: ", item)}
          expandedAll
          cascadeCheck
        />
      </MuiThemeProvider>
    );
  }
}
