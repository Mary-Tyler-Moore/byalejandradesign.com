import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import auth from './auth';
import secure from './secure';

// ensure order of middlewares here
const middleware = [
	cors({
		origin: 'https://artetexture.com',
		methods: 'POST, GET',
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
	secure,
	auth,
	json(),
	urlencoded({ extended: false }),
];

export default middleware;
