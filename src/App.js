import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'
import {Provider}  from 'react-redux'
import store from './store/index.js'
const theme = createMuiTheme({
  palette: {  
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});


class App extends Component {
  render() {
    return ( 
          <MuiThemeProvider theme={theme}>
             <Provider store={store}>
               <Routes />
            </Provider>
          </MuiThemeProvider>
    );
  }
}

export default App;
