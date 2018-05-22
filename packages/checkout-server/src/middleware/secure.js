function secure(req, res, next) {
	const isSecure = req.protocol;

	if (isSecure) next();
	else
		res.status(401).json({
			status: 401,
			error: 'only secure origins are allowed',
		});
}

module.exports = secure;
