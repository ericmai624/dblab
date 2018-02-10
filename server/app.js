import express from 'express';
import * as routes from './routes';
import * as middleware from './middleware';

const app = express();
const port = process.env.PORT || 8081;

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));
app.use(middleware.auth);

app.use('/api/user', routes.user);

app.listen(port, () => console.log(`> Ready to accept connections on port ${port}`));
