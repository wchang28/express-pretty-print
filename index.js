var defaultOptions = {
	prettyPrintHeader: 'x-prettyprint'
	,replacer: null
	,spaces: 2
};
module.exports.get = function(options) {
	var options = options || defaultOptions;
	if (options != defaultOptions) {
		for (var fld in defaultOptions) {
			if (options[fld] === undefined)
				options[fld] = defaultOptions[fld];
		}
	}
	return (function(req, res, next) {
		if (req.headers[options.prettyPrintHeader]) {
			res.json = function(obj) {
				var body = JSON.stringify(obj, options.replacer, options.spaces);
				if (!this.get('Content-Type'))
					this.set('Content-Type', 'application/json');
				this.send(body);
			};
		}
		next();
	});
};