import { createStore } from 'redux';
import metalApp from '../reducers';

export default createStore(metalApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());