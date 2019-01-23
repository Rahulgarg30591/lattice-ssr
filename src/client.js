import React from 'react';
import { hydrate } from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  createGenerateClassName, MuiThemeProvider
} from '@material-ui/core/styles';
import TreeComp from './Components/TreeComp';
import theme from './theme';

const generateClassName = createGenerateClassName();
hydrate(
  <JssProvider generateClassName={generateClassName} >
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root'),
  () => {
    document.getElementById('jss-styles').parentNode.removeChild(document.getElementById('jss-styles'))
  }
)

// <App />
