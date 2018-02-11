import chalk from 'chalk';
import config from 'config';
import models from 'models';

export default async (req, res) => {
  try {
    let { id, email } = req.payload;
    let user = null;

    if (!id && !email) {
      return res.sendStatus(400);
    } else if (id) {
      user = await models.User.findById(id);
    } else if (email) {
      user = await models.User.findOne({ email });
    }

    if (!user) return res.sendStatus(404);
    res.json(user.toObject());
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to get user profile: ', err)));
    res.sendStatus(500);
  }
};
