import React, { Component } from 'react';
import { Router, Route, IndexRoute, Switch } from 'react-router-dom';

import RequireAuth from './auth/require_auth';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Message from './message/main_message';
import Landing from './landing';


export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route path="/message" component={RequireAuth(Message)} />
          <Route exact path="/" component={Signin} />
        </Switch>
      </div>
    );
  }
}
