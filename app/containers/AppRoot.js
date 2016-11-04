import React from 'react';
import { connect } from 'react-redux';

import { selectWord } from '../actions';

import WordList from '../components/WordList';

const AppRoot = ({ dispatch }) => 
    <div className="container">
       <WordList  />
    </div>

export default connect()(AppRoot);
