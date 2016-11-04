var axios = require('axios');

// var metal = {
//     getData: function (bandName) {
//         return axios.get('http://whateverorigin.org/get?url=' + encodeURIComponent('http://google.com') + '&callback=?');
//     }
// }

// module.exports = metal;

export function getBands(query) {
    return axios.get('http://localhost:3000/' + query);
}