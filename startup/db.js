import mongoose from "mongoose";
import config from 'config';

const db_url = config.get('db_url');
const db_name = config.get('db_name');

export default function (logger) {
  mongoose.connect(`${db_url}${db_name}`).then(() => {
    logger.info("connected to MongoDB on port 27017");
  });
}
