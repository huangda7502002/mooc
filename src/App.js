import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Login from './Container/login/Login'
import Register from './Container/register/Register'
import AuthRoute from './Component/authroute/authroute'
import BossInfo from './Container/bossinfo/bossinfo'
import GeniusInfo from './Container/geniusinfo/geniusinfo'
import Dashboard from './Component/dashboard/dashboard'
import Chat from './Component/chat/chat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthRoute/><AuthRoute/>
        <Switch>
          <Route path={'/geniusinfo'} component={GeniusInfo}/>
          <Route path={'/bossinfo'} component={BossInfo}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/chat/:user'} component={Chat}/>
          <Route component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
