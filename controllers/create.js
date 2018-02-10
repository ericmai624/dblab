import chalk from 'chalk';
import bcrypt from 'bcrypt';
import config from 'config';
import models from 'models';

export default async (req, res) => {
  try {
    let { password } = req.payload;

    req.payload.password = await bcrypt.hash(password, 10);

    let newUser = await models.User.create(req.payload);
    
    res.json(newUser.toObject());
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to create user profile: ', err)));
    res.sendStatus(500);
  }
};
