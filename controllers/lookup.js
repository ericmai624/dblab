import chalk from 'chalk';
import config from 'config';
import { User } from 'models';

export default async (req, res) => {
  try {
    let { id, email } = req.payload;
    if (id) return res.send(await User.findById(id));
    if (email) return res.send(await User.findOne({ email }));
    return res.sendStatus(406);
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to get user by id: ', err)));
    res.sendStatus(500);
  }
};
