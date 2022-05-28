import express, { json, Router } from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/error';
import { adRouter } from './routers/ad-router';
import { config } from './config/config';

const app = express();
app.use(cors({ origin: config.corsOrigin, }));
app.use(json());
app.use(rateLimit({
	windowMs: 5*60*1000,
	max: 100
}))

const router = Router()

router.use('/ad', adRouter)

app.use('/api', router)

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
	console.log('Listening on port http://localhost:3001');
});
