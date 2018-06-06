import gateway from './gateway';

const routes = (app) => {
	app.get('/client_token', async (req, res) => {
		try {
			const clientToken = await gateway.clientToken.generate({});
			res.status(200).json({
				status: 200,
				...clientToken,
			});
		} catch (e) {
			res.status(404).json({
				status: 404,
				message: e,
			});
		}
	});

	app.post('/checkout', async (req, res) => {
		const { payment_method_nonce, amount } = req.body;

		try {
			const result = await gateway.transaction.sale({
				amount,
				paymentMethodNonce: payment_method_nonce,
				options: {
					submitForSettlement: true,
				},
			});

			res.status(200).json({
				result,
			});
		} catch (e) {
			console.log(e);
			res.status(404).json({
				status: 404,
				error: e,
			});
		}
	});
};

export default routes;
