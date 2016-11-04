import React from 'react';
import { connect } from 'react-redux';

import { selectWord } from '../actions';

import Word from '../components/Word';

const WordList = ({ words, onWordClick }) => 
    <ul className="word__list u-unlist">
        {words.map(word => 
            <li key={word}>
                <Word 
                    text={word}
                    onClick={() => onWordClick(word)} />
            </li>
        )}
    </ul>


const mapStateToProps = (state) => {
    return {
        words: state.wordList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onWordClick: (word) => {
            dispatch(selectWord(word));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WordList);