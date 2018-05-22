function responseHeaders(req, res, next) {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
	});

	next();
}

module.exports = responseHeaders;
