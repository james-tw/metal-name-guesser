var React = require('react');
var metal = require('../utils/metal');
var wordHelpers = require('../utils/wordHelpers');
var WordList = require('./WordList');
var SelectedWordContainer = require('../containers/SelectedWordContainer');
var axios = require('axios');
var $ = require('jquery');
var PropTypes = React.PropTypes;

var Home = React.createClass({
    getInitialState: function() {
        return {
            data: {},
            query: "",
            words: ["", ""],
            wordList: wordHelpers.words
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
            words: newWords
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
                wordList: newWordList
            });
        }
    },
    submitWords() {
        // TO DO: Check for bands with space in between, then check for no-space if 0 results received.
        axios.get('http://localhost:3000/' + this.state.words.join(' '))
            .then((data) => {
                var firstResult = data.data.aaData[0];
                $('.js-band-link').html(firstResult[0]);
                $('.js-band-genre').html(firstResult[1]);
                $('.js-band-country').html(firstResult[2]);

                this.setState({
                    data: data.data
                })
            })
    },
    render: function() {

        return (
            <div>
                <WordList words={this.state.wordList} />
                <SelectedWordContainer index={0} word={this.state.words[0]} />
                <SelectedWordContainer index={1} word={this.state.words[1]} />
                <div className="band-info">
                    <span className="js-band-link"></span> is a <span className="js-band-genre"></span> band from <span className="js-band-country"></span>.
                </div>

            </div>
        );
    }

});

module.exports = Home;