import React from 'react';


var Main = React.createClass({

    render: function() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }

});

module.exports = Main;