import chalk from 'chalk';
import bcrypt from 'bcrypt';
import config from 'config';
import models from 'models';
import _ from 'underscore';

export default async (req, res) => {
  try {
    let { id, email, password, newPassword } = req.payload;
    let user = null;

    if (id) {
      user = await models.User.findById(id);
    } else if (email) {
      user = await models.User.findOne({ email });
    } else {
      return res.sendStatus(400);
    }

    if (newPassword) {
      let isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return res.sendStatus(401);
      req.payload.password = await bcrypt.hash(newPassword, 10);
    }

    let updated = await user.update(_.omit(req.payload, ['id', 'newPassword'])).exec();
    
    res.json(updated.toObject());
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to patch user profile: ', err)));
    res.sendStatus(500);
  }
};
