var React = require('react');
var Word = require('../components/Word');

var SelectedWordContainer = React.createClass({
    propTypes: {
        word: React.PropTypes.string,
        handleClick: React.PropTypes.func
    },
    contextTypes: {
        deselectWord: React.PropTypes.any
    },
    handleClick() {
        this.context.deselectWord(this.props.index);
    },
    render: function() {
        return (
            <Word 
                word={this.props.word} 
                handleClick={this.handleClick} />
        );
    }

});

module.exports = SelectedWordContainer;