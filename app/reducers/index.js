// import { SELECT_WORD, DESELECT_WORD } from '../actions';
import { words } from '../utils/wordHelpers';

import { combineReducers } from 'redux';

const initialState = {
    wordList: words,
    selectedWords: ["Test", undefined]
}

const metalApp = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_WORD':
            // if ( !state.selectedWords[0] || !state.selectedWords[1]) {
            //     let newSelectedWords = state.selectedWords;
            //     newSelectedWords[newSelectedWords.indexOf(undefined)] = action.word;
            //     console.log(newSelectedWords);
            //     return Object.assign({}, state, {
            //         selectedWords: newSelectedWords
            //     });

            if ( !state.selectedWords[0] ) {
                var newSelectedWords = [...state.selectedWords];
                newSelectedWords[0] = action.word;

                return Object.assign({}, state, {
                     selectedWords: newSelectedWords
                });
            }

            if ( !state.selectedWords[1] ) {
                var newSelectedWords = [...state.selectedWords];
                newSelectedWords[1] = action.word;

                return Object.assign({}, state, {
                     selectedWords: newSelectedWords
                });
            }
             else {
                return state
            }
            
            // else if ( state.selectedWords.length < 2 && state.selectedWords[0] === undefined ) {
            //     return Object.assign({}, state, {
            //          selectedWords: [
            //             action.word,
            //             ...state.selectedWords
            //          ]
            //     });
            // }
        case 'DESELECT_WORD':
            return Object.assign({}, state, {
                // Remove the item at the specified index.
                selectedWords: state.selectedWords
                                        .slice(0, action.index)
                                        .concat("")
                                        .concat(state.selectedWords.slice(action.index + 1))
                
            })
        default:
            return state
    }
}

export default metalApp;