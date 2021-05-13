import React from 'react';
import SearchBar from './components/SearchBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5383e8"
    },
    secondary: {
      main: '#2F4170'
    }
  }
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* <div className="App">
        <SearchBar bill={true} />
      </div> */}
      <SignIn />
    </MuiThemeProvider>
  );
}

export default App;
