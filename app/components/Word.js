import React from 'react';
import { connect } from 'react-redux';

const Word = ({ onClick, text }) => 
    <div className="word" onClick={onClick}>
        {text}
    </div>

export default Word;