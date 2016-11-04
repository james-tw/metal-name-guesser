// import { SELECT_WORD, DESELECT_WORD } from '../actions';
import { words } from '../utils/wordHelpers';

import { combineReducers } from 'redux';

const initialState = {
    wordList: words,
    selectedWords: []
}

const metalApp = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_WORD':
            if ( state.selectedWords.length < 2 ) {
                return Object.assign({}, state, {
                     selectedWords: [
                        ...state.selectedWords, 
                        action.word
                     ]
                });
            }
        default:
            return state
    }
}

export default metalApp;