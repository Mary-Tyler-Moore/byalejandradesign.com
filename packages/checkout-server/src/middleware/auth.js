const requestAPIKey = process.env.REQUEST_API_KEY;

function auth(req, res, next) {
	next();
	// const key = req.get('Authorization');

	// if (key === requestAPIKey) next();
	// else
	// 	res.status(401).json({
	// 		status: 401,
	// 		error: 'not authorized',
	// 	});
}

module.exports = auth;
