import chalk from 'chalk';
import config from 'config';
import models from 'models';

export default async (req, res) => {
  try {
    let { id, email } = req.payload;
    if (id) return res.json((await models.User.findById(id)).toObject());
    if (email) return res.json((await models.User.findOne({ email })).toObject());
    return res.sendStatus(406);
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to get user profile: ', err)));
    res.sendStatus(500);
  }
};
