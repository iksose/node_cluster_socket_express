var fs = require('fs');
var domain = require('domain');
var d = domain.create();


//SYNCHRONOUS TRY CATCH
exports.crash = function(req, res) {
  try {
    JSON.parse(fs.readFileSync('./invalidJSON.json', 'utf8'))
  } catch (err) {
    console.log("LOL")
  } finally {
    console.log("DOUBLE LOL")
    process.exit()
  }
};

//DOMAINS, ASYNC READ
d.on('error', function(err) {
  console.error("DOMAIN", err);
  process.exit();
});

exports.crash2 = function(req, res){
  d.run(function() {
    fs.readFile('somefile.txt', function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });
}
