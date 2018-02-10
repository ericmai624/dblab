import bcrypt from 'bcrypt';
import util from 'util';
import chalk from 'chalk';
import { User } from 'models';

export default async (req, res) => {
  try {
    let { email, password } = req.payload;
    let user = await User.findOne({ email });
    let isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) return res.sendStatus(403);
    user.loginCounts++;
    user.lastLogin = Date.now();
    return res.send(await user.save());
  } catch (err) {
    console.log(chalk.bgRed(chalk.white('An error has occured when trying to logging user in: ', err)));
    res.sendStatus(500);
  }
};
