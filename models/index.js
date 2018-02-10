import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import config from 'config';

const { uri } = config.database;
mongoose.connect(uri);

fs
  .readdirSync('.')
  .filter(file => /^\w+\.js$/gi.test(file) && file !== 'index.js')
  .forEach(file => {
    const { default: schema } = require(path.join(__dirname, 'models', file));
    
    mongoose.model(schema.documentName, schema.fields);
  })
;

export default mongoose.models;
