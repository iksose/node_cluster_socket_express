exports.index = function(req, res) {
	// res.send(500, { "user": "req.user" })
  res.render('index.html', { "user": "req.user" }, function(err, html){
  	res.set({
    'Other-Header': 'value'
  	});
  	res.send(html)
  });
};
