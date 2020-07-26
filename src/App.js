import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Paperbase from './components/Paperbase';
import Update_Sec from './components/Update_Sec';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard/:id" component={Paperbase} />
          <PrivateRoute path="/add_vent" component={Form} />
          <PrivateRoute path="/post" render={(props) => <Form {...props }/>} />
          <PrivateRoute path="/update/:id" component={Update_Sec} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
