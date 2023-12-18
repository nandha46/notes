import mongoose from "mongoose";
import winston from "winston";

export default function () {
  mongoose.connect(`${db_url}${db_name}}`).then(() => {
    winston.info("connected to MongoDB on port 27017");
  });
}
