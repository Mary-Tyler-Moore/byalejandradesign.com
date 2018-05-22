// import gateway from './gateway';

const routes = (app) => {
	// app.get('/client_token', async (req, res) => {
	// 	try {
	// 		const clientToken = await gateway.clientToken.generate({});
	// 		res.state(200).json({
	// 			status: 200,
	// 			clientToken,
	// 		});
	// 	} catch (e) {
	// 		res.status(404).json({
	// 			status: 404,
	// 			message: e,
	// 		});
	// 	}
	// });
	// app.post('/checkout', async (req, res) => {
	// 	const paymentMethodNonce = req.body.payment_method_nonce;
	// 	try {
	// 		const result = await gateway.transaction.sale({
	// 			amount,
	// 			paymentMethodNonce,
	// 			options: {
	// 				submiteForSettlement: true,
	// 			},
	// 		});
	// 	} catch (e) {
	// 		res.status(404).json({
	// 			status: 404,
	// 			error: e,
	// 		});
	// 	}
	// });
};

export default routes;
