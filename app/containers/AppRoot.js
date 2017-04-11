import React from 'react';
import { connect } from 'react-redux';

import { selectWord } from '../actions';

import WordList from '../components/WordList';
import SelectedWords from '../components/SelectedWords';

import '../sass/main.scss';

const AppRoot = ({ dispatch }) => 
    <div className="container">
       <WordList  />
       <SelectedWords  />
    </div>

export default connect()(AppRoot);
