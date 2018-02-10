import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import config from 'config';
import util from 'util';
import bcrypt from 'bcrypt';
import { User } from 'models';

const getUserProfile = async (req, res) => {
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

const login = async (req, res) => {
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

export default { getUserProfile, login };
