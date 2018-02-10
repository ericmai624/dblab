import mongoose from 'mongoose';
import config from 'config';
import userSchema from './user';

mongoose.connect(config.database.uri);

mongoose.model('User', userSchema);

export default mongoose.models;
