import jwt from 'jsonwebtoken';
import util from 'util';
import chalk from 'chalk';
import config from 'config';

export default async (req, res, next) => {
  let authorization = req.headers['Authorization'];

  if (!authorization) return res.sendStatus(401);

  try {
    let { secret } = config.jwt;
    let token = authorization.replace(/Bearer /i, '');
    let verify = util.promisify(jwt.verify);
    let decoded = await verify(token, secret);
    if (!decoded) return res.sendStatus(401);
    req.payload = decoded;
    next();
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to verify access token: ', err)));
    res.sendStatus(500);
  }
};