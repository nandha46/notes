import mongoose from "mongoose";
import winston from "winston";
import config from 'config';

const db_url = config.get('db_url');
const db_name = config.get('db_name');

export default function () {
  mongoose.connect(`${db_url}${db_name}}`).then(() => {
    winston.info("connected to MongoDB on port 27017");
  });
}
