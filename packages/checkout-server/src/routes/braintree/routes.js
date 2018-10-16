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
		const {
			paymentMethodNonce,
			amount,
			billing,
			shipping,
			customer,
			lineItems,
			orderId,
		} = req.body;

		try {
			// const customer = await gateway.customer;
			const result = await gateway.transaction.sale({
				amount,
				paymentMethodNonce,
				billing,
				shipping,
				customer,
				lineItems,
				orderId,
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
