var fs = require('fs')

exports.crash = function(req, res) {
  thisFN;
  JSON.parse(fs.readFileSync('./invalidJSON.json', 'utf8'))
};
