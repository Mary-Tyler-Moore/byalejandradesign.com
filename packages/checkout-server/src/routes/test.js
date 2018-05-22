const tests = (app) => {
	app.post('/test/body', async (req, res) => {
		const { body } = req;
		res.status(200).json({
			status: 200,
			...body,
		});
	});
};

export default tests;
