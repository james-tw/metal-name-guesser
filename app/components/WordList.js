var React = require('react');
var WordContainer = require('../containers/WordContainer');

function getWordComponents(words) {
    return words.map((val) => {
        return (
            <WordContainer word={val} />
        )
    })
}

var WordList = React.createClass({
    
    render: function() {
        
        return (
            <ul>
                {getWordComponents(this.props.words)}
            </ul>
        );
    }

});

module.exports = WordList;