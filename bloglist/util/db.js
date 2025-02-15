import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.js";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.error("failed to connect to database");

    process.exit(1);
  }
};
