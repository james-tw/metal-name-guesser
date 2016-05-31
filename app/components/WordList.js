var React = require('react');
var PropTypes = React.PropTypes;
var PossibleWordContainer = require('../containers/PossibleWordContainer');


function getWordComponents(words) {
    return words.map((val) => {
        return (
            <PossibleWordContainer word={val} key={val}/>
        )
    })
}

var WordList = React.createClass({
    
    render: function() {
        
        return (
            <ul className="word__list u-unlist">
                {getWordComponents(this.props.words)}
            </ul>
        );
    }

});

WordList.propTypes = {
    words: React.PropTypes.array
}

module.exports = WordList;