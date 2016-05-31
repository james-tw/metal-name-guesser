import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from '../components/Main';
import HomeContainer from '../containers/HomeContainer';

var routes = (
    <Router history={ hashHistory }>
        <Route path="/" component={Main}>
            <IndexRoute component={HomeContainer} />
        </Route>
    </Router>
)

module.exports = routes;