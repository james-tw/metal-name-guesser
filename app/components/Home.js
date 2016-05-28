var React = require('react');
var metal = require('../utils/metal');
var axios = require('axios');
var $ = require('jquery');

var Home = React.createClass({
    getInitialState: function() {
        return {
            data: {},
            query: ""
        };
    },
    handleFormSubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:3000/' + this.state.query)
            .then((data) => {
                $('#band-link').html(data.data.aaData[0][0]);
                this.setState({
                    data: data.data
                })
            })
    },
    handleFormChange(e) {
        this.setState({
            query: e.target.value 
        });
    },
    render: function() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>

                    <input type="text" value={this.state.query} onChange={this.handleFormChange}/>
                    <input type="submit" value="Submit"/>
                </form>
                <h1>Here it is:</h1>
                <div id="band-link"></div>

            </div>
        );
    }

});

module.exports = Home;