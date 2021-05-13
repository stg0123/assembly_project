import React from 'react';
import SearchBar from './components/SearchBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import { Typography } from '@material-ui/core';
import TopThreeList from './components/TopThreeList';
import Main from './components/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5383e8"
    },
    secondary: {
      main: '#2F4170'
    },
    up: {
      main: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    down: {
      main: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    }

  },
  typography: {
    fontFamily: [
      'Jua',
      'Black Han Sans'
    ].join(','),
  },
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
    userEmail: 'helloworld@test.com',
    userName: '전세환'
  })
  const dataProps = {
    user: User,
    setUser: setUser
  }
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path='/person' component={(props) => <Main {...props} {...dataProps} type="person" />} />} />
          <Route path='/login' component={(props) => <Header {...props} type='login' {...dataProps} />} />
          <Route path='/' component={(props) => <Main {...props} {...dataProps} type="law" />} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
