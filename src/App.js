import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import AttendanceView from './components/Admin/AttendanceView/AttendanceView';
import CreateSessionView from './components/Admin/CreateSessionView/CreateSessionView';
import RegView from './components/Student/RegView/RegView';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/registration"
          component={RegView}
        />
        {/* <Route
          path="/success"
          component={SuccessView}
        /> */}
        <Route
          path="/attendance"
          component={AttendanceView}
        />
        {/* <Route
          path="/checkin"
          component={AttendanceTable}
        /> */}
        <Route
          path="/session"
          component={CreateSessionView}
        />
        {/* <Route
          path="/classnames"
          component={sessionForm}
        /> */}
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
