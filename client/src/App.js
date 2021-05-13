import React from 'react';
import SearchBar from './components/SearchBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}))

function App(props) {
  const classes = useStyles();
  const [User, setUser] = useState({
    isLogin: true,
    userID: 'test123'
  })
  const dataProps = {
    user: User,
    setUser: setUser
  }
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path='/person' component={(props) => <Header {...props} type='person' {...dataProps} />} />
          <Route path='/signin' component={(props) => <Header {...props} type='signin' {...dataProps} />} />
          <Route path='/signup' component={(props) => <Header {...props} type='signup' {...dataProps} />} />
          <Route path='/' component={(props) => <Header {...props} type='law' {...dataProps} />} />
        </Switch>
        <Switch>
          <Route path='/signin' component={(props) => <SignIn {...props} {...dataProps} />} />
          <Route path='/signup' component={(props) => <SignUp {...props} {...dataProps} />} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
