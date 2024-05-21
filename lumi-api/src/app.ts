import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import apiRouter from './routers/api';

const app = express();

app.use(cors());
app.use(fileUpload());

app.use('/api/v1', apiRouter);

export default app;