const fallback = (app) => {
	app.route('/*').all((req, res) => {
		res.status(404).json({
			status: 404,
			message: 'route not found',
		});
	});
};

export default fallback;
