import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'




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
    <BrowserRouter>
      <Switch>
        <Route path='/person' component={(props) => <Header {...props} type='person' {...dataProps} />} />
        <Route path='/login' component={(props) => <Header {...props} type='login' {...dataProps} />} />
        <Route path='/' component={(props) => <Header {...props} type='law' {...dataProps} />} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
