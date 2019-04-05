import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import MoviePage from './Pages/MoviePage/MoviePage';

import Movies from './Pages/Movies'

export class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => <Movies {...props}/>}/>
                    <Route path='/movie/:id' render={(props) => <MoviePage {...props}/>}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
