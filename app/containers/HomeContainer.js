var React = require('react');
var axios = require('axios');
var $ = require('jquery');
var wordHelpers = require('../utils/wordHelpers');
var Home = require('../components/Home');

import {getBands} from '../utils/ajax';


function packageBandData(rawData) {
    var bandData = {
        name: $(rawData[0])[0].text,
        link: $(rawData[0])[0].href,
        genre: rawData[1],
        country: rawData[2]
    }
    return bandData;
}

var HomeContainer = React.createClass({
    getInitialState: function() {
        return {
            currentBand: undefined,
            query: "",
            words: ["", ""],
            wordList: wordHelpers.words,
            isLoading: false,
            noBandFound: false
        };
    },
    getChildContext:function(){
        return {
            enterWord: this.enterWord,
            deselectWord: this.deselectWord
        }
    },
    childContextTypes: {
        enterWord: React.PropTypes.any,
        deselectWord: React.PropTypes.any
    },
    enterWord(word) {
        if ( this.state.words[0] === "" ) {
            this.setWordState(word, 0);
        } else if ( this.state.words[1] === "" ) {
            this.setWordState(word, 1);
        } else {
            console.log("Remove a word from slot 1 or 2 first.");
        }
    },
    setWordState(word, index) {
        var newWordList = this.state.wordList;
        newWordList.splice( newWordList.indexOf(word) , 1 );

        var newWords = this.state.words;
        newWords[index] = word;

        this.setState({
            wordList: newWordList,
            words: newWords,
            noBandFound: false
        }, () => {
            if ( (this.state.words[0] !== "") && (this.state.words[1] !== "") ) {
                this.submitWords();
            }
        });
        
    },
    deselectWord(index) {
        if ( this.state.words[index] !== "" ) {
            var oldWord = this.state.words[index];
            var newWordList = this.state.wordList;
            newWordList.push(oldWord);

            var newWords = this.state.words;
            newWords[index] = "";

            this.setState({
                words: newWords,
                wordList: newWordList,
                noBandFound: false,
                currentBand: undefined
            });
        }
    },
    submitWords() {
        this.setState({
            isLoading: true
        });
        // Check for bands with space in between
        getBands(this.state.words.join(' '))
            .then((data) => {
                if ( data.data.aaData.length === 0 ) {
                    //No results found. Run a search without space.
                    getBands(this.state.words.join(''))
                        .then((data) => {
                            if ( data.data.aaData.length === 0 ) {
                                this.setNoBandFound();
                            } else {
                                this.verifySameName(packageBandData(data.data.aaData[0]));
                            }
                        });
                } else {
                    this.verifySameName(packageBandData(data.data.aaData[0]));
                }
            });
    },
    verifySameName(bandData) {
        var rawBandName = bandData.name.replace(/[^a-zA-Z]+/g, "").toLowerCase();
        var rawQueryName = this.state.words.join('').replace(/[^a-zA-Z]+/g, "").toLowerCase();

        if ( rawBandName === rawQueryName ) {
            // Found a match. 
            this.updateCurrentBand(bandData);
        } else {
            this.setNoBandFound();
        }
    },
    updateCurrentBand(bandData) {
        this.setState({
            isLoading: false,
            currentBand: bandData
        });
    },
    setNoBandFound() {
        // Display "no band found" message instead of band info
        this.setState({
            isLoading: false,
            currentBand: undefined,
            noBandFound: true
        })
    },
    render: function() {
        return (
            <Home 
                currentBand={this.state.currentBand}
                words={this.state.words}
                wordList={this.state.wordList}
                isLoading={this.state.isLoading}
                noBandFound={this.state.noBandFound}
                />
        );
    }

});

module.exports = HomeContainer;