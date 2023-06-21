import 'dotenv/config';
import './config/fetch';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import DBClient from './providers/database-client';
import router from './routes';

DBClient.init();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', router);
app.use('/health', (_req, res) => {
    res.send('OK!');
});
app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT, () => {
    console.log("Hey I'm running!");
});