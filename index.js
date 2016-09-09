module.exports.get = function(options) {
	return (function(req, res, next) {
		if (req.headers['x-prettyprint']) {
			console.log('***********************************');
			console.log(res.json);
			console.log('***********************************');
			res.json = function(obj) {
				var s = JSON.stringify(obj, null, 2);
				res.header('content-type', 'application/json; charset=utf-8');
				res.end(s);
			};
		}
		next();
	});
};