import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TrainingExperiment from './training_experiment/TrainingExperiment.js';
import TestExperiment from './test_experiment/TestExperiment.js';
import * as serviceWorker from './serviceWorker';
import { Switch, HashRouter, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/"><TrainingExperiment/></Route>
          <Route path="/test"><TestExperiment/></Route>
          <Route>הכתובת לא קיימת!</Route>
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
