var React = require('react');
var metal = require('../utils/metal');
var wordHelpers = require('../utils/wordHelpers');
var WordList = require('./WordList');
var SelectedWordContainer = require('../containers/SelectedWordContainer');
var axios = require('axios');
var $ = require('jquery');
var PropTypes = React.PropTypes;

require('../css/main.css');

var Home = React.createClass({
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
        // TO DO: Check for bands with space in between, then check for no-space if 0 results received.
        axios.get('http://localhost:3000/' + this.state.words.join(' '))
            .then((data) => {
                this.setState({
                    isLoading: true
                }, () => {
                    if ( data.data.aaData.length === 0 ) {
                        //No results found. Run a search without space.
                        axios.get('http://localhost:3000/' + this.state.words.join(''))
                            .then((data) => {
                                if ( data.data.aaData.length === 0 ) {
                                    this.noBandFound();
                                } else {
                                    this.verifySameName(this.packageBandData(data.data.aaData[0]));
                                }
                            });
                    } else {
                        this.verifySameName(this.packageBandData(data.data.aaData[0]));
                    }
                });
                
                
            })
    },
    packageBandData(rawData) {
        var bandData = {
            name: $(rawData[0])[0].text,
            link: $(rawData[0])[0].href,
            genre: rawData[1],
            country: rawData[2]
        }
        return bandData;
    },
    verifySameName(bandData) {
        var rawBandName = bandData.name.replace(/[^a-zA-Z]+/g, "").toLowerCase();
        var rawQueryName = this.state.words.join('').replace(/[^a-zA-Z]+/g, "").toLowerCase();

        if ( rawBandName == rawQueryName ) {
            // Found a match. Send band data to updateCurrentBand(bandData)
            this.updateCurrentBand(bandData);
        } else {
            this.noBandFound();
        }
    },
    updateCurrentBand(bandData) {
        this.setState({
            isLoading: false,
            currentBand: bandData
        }, function () {
            console.log(this.state.currentBand)
        })
    },
    noBandFound() {
        // Display "no band found" message instead of band info
        this.setState({
            isLoading: false,
            currentBand: undefined,
            noBandFound: true
        })
    },
    render: function() {

        return (
            <div className="container">
                <WordList words={this.state.wordList} />
                <div className="selected-words">
                    <SelectedWordContainer index={0} word={this.state.words[0]} />
                    <SelectedWordContainer index={1} word={this.state.words[1]} />
                </div>
                <div className="search-results">
                    { this.state.currentBand !== undefined && 
                    (
                        <div className="band-info">
                            <a href={this.state.currentBand.link}>{this.state.currentBand.name}</a> is a {this.state.currentBand.genre} band from {this.state.currentBand.country}.
                        </div>
                    )}
                    { this.state.noBandFound && 
                    (
                        <div>No bands with that name... yet.</div>
                    )}
                    { this.state.isLoading && 
                    (
                        <div>Loading...</div>
                    )}
                    { ( !this.state.isLoading && !this.state.noBandFound && (this.state.currentBand === undefined) ) && 
                    (
                        <div>Choose two words to combine.</div>
                    )}
                </div>
                
                

            </div>
        );
    }

});

module.exports = Home;