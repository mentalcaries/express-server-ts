import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(cookieSession({keys:['string']}))
app.use(router)

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
