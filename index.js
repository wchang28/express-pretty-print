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
				// settings
				var app = this.app;
				var body = JSON.stringify(obj, options.replacer, options.spaces);
				// content-type
				if (!this.get('Content-Type'))
					this.set('Content-Type', 'application/json');
				this.send(body);
			};
			res.jsonp = function(obj) {
				// settings
				var app = this.app;
				var body = JSON.stringify(obj, options.replacer, options.spaces);
				var callback = this.req.query[app.get('jsonp callback name')];
				// content-type
				if (!this.get('Content-Type')) {
					this.set('X-Content-Type-Options', 'nosniff');
					this.set('Content-Type', 'application/json');					
				}
				// fixup callback
				if (Array.isArray(callback)) {
					callback = callback[0];
				}
				// jsonp
				if (typeof callback === 'string' && callback.length !== 0) {
					this.charset = 'utf-8';
					this.set('X-Content-Type-Options', 'nosniff');
					this.set('Content-Type', 'text/javascript');

					// restrict callback charset
					callback = callback.replace(/[^\[\]\w$.]/g, '');

					// replace chars not allowed in JavaScript that are in JSON
					body = body
					.replace(/\u2028/g, '\\u2028')
					.replace(/\u2029/g, '\\u2029');

					// the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
					// the typeof check is just to reduce client error noise
					body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
				}
			};
		}
		next();
	});
};