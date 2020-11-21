import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink

} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="link-con">
        <NavLink to="/dfs" activeClassName="active">
          /depth-first-search
        </NavLink>
        <NavLink to="/bfs" activeClassName="active">
          /breadth-first-search
        </NavLink>
      </div>
      <Switch>
        <Redirect exact from="/" to="/dfs" />
        <Route exact path="/:type">
          <App />
        </Route>

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
