var React = require('react');
var Word = require('../components/Word');


var WordContainer = React.createClass({
    propTypes: {
        word: React.PropTypes.string,
        handleClick: React.PropTypes.func
    },
    contextTypes: {
        enterWord: React.PropTypes.any
    },
    handleClick() {
        this.context.enterWord(this.props.word);
    },
    render: function() {
        return (
            <Word 
                word={this.props.word} 
                handleClick={this.handleClick} />
        );
    }

});

module.exports = WordContainer;