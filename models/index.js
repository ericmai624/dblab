import mongoose from 'mongoose';
import config from 'config';
import userSchema from './user';

mongoose.connect(config.database.uri);

mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));
mongoose.connection.once('open', console.log.bind(console, '> Database is ready to accept connections'));

mongoose.model('User', userSchema);

export default mongoose.models;
