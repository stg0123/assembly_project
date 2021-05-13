import React from 'react';
import SearchBar from './components/SearchBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import Main from './components/Main';
import LawSearch from './components/LawSearch';
import PersonSearch from './components/PersonSearch';
import PersonDetail from './components/PersonDetail';
import LawContent from './components/LawContent'
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5383e8",
    },
    secondary: {
      main: '#2F4170'
    },
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
    isLogin: false,
    userID: ''
  });
  const [Target, setTarget] = useState('테스트')

  useEffect(() => {
    const username = cookies.get('username');
    if (username)
      setUser({ isLogin: true, userID: username });
    else
      setUser({ isLogin: false, ...User });

  }, []);

  const setLogin = (data) => {
    setUser(data);
    cookies.set('username', data.userID);
  };

  const dataProps = {
    user: User,
    setUser: setLogin,
    Target: Target,
    setTarget: setTarget
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
          <Route path="/person/search/:word" component={(props) => <PersonSearch {...props} {...dataProps} type='person' />} />
          <Route path="/person/detail/:id" component={(props) => <PersonDetail {...props} {...dataProps} type='person' />} />
          <Route path="/person" component={(props) => <Main {...props} {...dataProps} type='person' />} />
          <Route path='/signin' component={(props) => <SignIn {...props} {...dataProps} />} />
          <Route path='/signup' component={(props) => <SignUp {...props} {...dataProps} />} />
          <Route path='/search/:word' component={(props) => <LawSearch {...props} {...dataProps} />} />
          <Route path='/content/:lawId' component={(props) => <LawContent {...props} {...dataProps} />} />
          <Route path="/" component={(props) => <Main {...props} {...dataProps} type='law' />} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
