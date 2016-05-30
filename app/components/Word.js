var React = require('react');

function Word(props) {
    return (
        <li className="word" onClick={props.handleClick}>
            {props.word}
        </li>
    )
}

module.exports = Word;