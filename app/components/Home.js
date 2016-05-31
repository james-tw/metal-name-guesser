var React = require('react');
var WordList = require('../components/WordList');
var SelectedWordContainer = require('../containers/SelectedWordContainer');

require('../css/main.css');

function Home (props) {
    return (
        <div>
            <WordList words={props.wordList} />
            <div className="selected-words">
                <SelectedWordContainer index={0} word={props.words[0]} />
                <SelectedWordContainer index={1} word={props.words[1]} />
            </div>
            <div className="search-results">
                { props.currentBand !== undefined && 
                (
                    <div className="band-info">
                        <a href={props.currentBand.link}>{props.currentBand.name}</a> is a {props.currentBand.genre} band from {props.currentBand.country}.
                    </div>
                )}
                { props.noBandFound && 
                (
                    <div>No bands with that name... yet.</div>
                )}
                { props.isLoading && 
                (
                    <div>Loading...</div>
                )}
                { ( !props.isLoading && !props.noBandFound && (props.currentBand === undefined) ) && 
                (
                    <div>Choose two words to combine.</div>
                )}
            </div>
        </div>
    )
}

Home.propTypes = {
    currentBand: React.PropTypes.object,
    words: React.PropTypes.array.isRequired,
    wordList: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    noBandFound: React.PropTypes.bool.isRequired
}

module.exports = Home;