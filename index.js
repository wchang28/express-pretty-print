module.exports.get = function(options) {
	return (function(req, res, next) {
		if (req.headers['x-prettyprint']) {
			res.json = function(obj) {
				var body = JSON.stringify(obj, null, 2);
				if (!res.get('Content-Type'))
					res.set('Content-Type', 'application/json');
				res.send(body);
			};
		}
		next();
	});
};