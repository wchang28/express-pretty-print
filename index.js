module.exports.get = function(options) {
	return (function(req, res, next) {
		if (req.headers['x-prettyprint']) {
			res.json = function(obj) {
				var s = JSON.stringify(obj, null, 2);
				console.log('=================================================');
				console.log(typeof res.app.get('etag'));
				console.log('');
				console.log(res.app.get('etag'));
				console.log('=================================================');
				console.log('');
				res.header('content-type', 'application/json; charset=utf-8');
				res.end(s);
			};
		}
		next();
	});
};