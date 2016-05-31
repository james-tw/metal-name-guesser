var React = require('react');

function Word(props) {
    return (
        <li className="word" onClick={props.handleClick}>
            {props.word}
        </li>
    )
}

Word.propTypes = {
    handleClick: React.PropTypes.func.isRequired,
    word: React.PropTypes.string
}

module.exports = Word;