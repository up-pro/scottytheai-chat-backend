// ---------------------------------------------------------------------------------------------

import { Sequelize, DataTypes } from "sequelize";

const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "";

// ---------------------------------------------------------------------------------------------

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  define: { freezeTableName: true, underscored: true }
});

// ---------------------------------------------------------------------------------------------

export const ChatMessage = sequelize.define("chat_messages", {
  role: DataTypes.STRING,
  content: DataTypes.TEXT
});

export const ChatHistory = sequelize.define("chat_histories", {
  first_message: DataTypes.STRING,
  creator_wallet_address: DataTypes.STRING,
  messages: DataTypes.TEXT
});
