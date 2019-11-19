import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './Homepage';
import MovieDetail from './MovieDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div id='app'>
        <Switch>
          <Route path='/movie/:id' children={<MovieDetail />}/>
          <Route path='/'>
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
