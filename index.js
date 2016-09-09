module.exports.get = function(options) {
	return (function(req, res, next) {
		if (req.headers['x-prettyprint']) {
			res.json = function(obj) {
				res.end(JSON.stringify(obj, null, 2));
			};
		}
		next();
	});
};