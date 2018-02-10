import bcrypt from 'bcrypt';
import util from 'util';
import chalk from 'chalk';
import models from 'models';

export default async (req, res) => {
  try {
    let { email, password } = req.payload;
    let user = await models.User.findOne({ email });

    if (!user) return res.sendStatus(404);

    let isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) return res.sendStatus(403);
    
    user.loginCounts++;
    user.lastLogin = Date.now();

    let saved = await user.save();

    return res.json(saved.toObject());
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to logging user in: ', err)));
    res.sendStatus(500);
  }
};
