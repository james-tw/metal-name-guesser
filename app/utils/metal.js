var axios = require('axios');

var metal = {
    getData: function (bandName) {
        return axios.get('http://whateverorigin.org/get?url=' + encodeURIComponent('http://google.com') + '&callback=?');
    }
}

module.exports = metal;