import React from 'react';
import { connect } from 'react-redux';

import { deselectWord } from '../actions';

import Word from '../components/Word';

const SelectedWords = ({ words, onWordClick }) => 
    <div className="selected-words">
        <ul className="word__list u-unlist">
            {words.map((word, index) => 
                <li >
                    <Word 
                        index={index}
                        text={word}
                        onClick={() => onWordClick(index)} />
                </li>
            )}
        </ul>
    </div>


const mapStateToProps = (state) => {
    return {
        words: state.selectedWords
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onWordClick: (word) => {
            dispatch(deselectWord(word));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectedWords);