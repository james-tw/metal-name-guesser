import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/configureStore';

import AppRoot from './containers/AppRoot';


ReactDOM.render(
    <Provider store={store}>
        <AppRoot />
    </Provider>,
    document.getElementById('app')
)