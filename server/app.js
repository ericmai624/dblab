import express from 'express';
import * as middleware from './middleware';
import * as controllers from 'controllers';

const app = express();
const port = process.env.PORT || 8081;

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));
app.use(middleware.auth);

app.route('/')
  .get(controllers.lookup)
;

app.get('/login', controllers.login);

app.listen(port, () => console.log(`> Ready to accept connections on port ${port}`));
