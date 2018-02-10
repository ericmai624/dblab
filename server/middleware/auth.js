import jwt from 'jsonwebtoken';
import util from 'util';
import chalk from 'chalk';
import config from 'config';

export default async (req, res, next) => {
  console.log(chalk.bgRed(chalk.white('Verifying incoming request')));
  let authorization = req.get('Authorization');

  if (!authorization) return res.sendStatus(401);

  try {
    console.log(chalk.bgBlue(chalk.white('Decoding incoming request token')));
    let { secret } = config.jwt;
    let verify = util.promisify(jwt.verify);

    let token = authorization.replace(/Bearer /i, '');

    let decoded = await verify(token, secret);

    if (!decoded) return res.sendStatus(401);

    req.payload = decoded.data;

    console.log(chalk.bgGreen(chalk.white('Verified!')));
    next();
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to verify access token: ', err)));
    res.sendStatus(500);
  }
};