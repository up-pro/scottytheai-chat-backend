import { Sequelize, DataTypes } from "sequelize";

// ---------------------------------------------------------------------------------------------

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

export const ChatHistory = sequelize.define("chat_histories", {
  title: DataTypes.TEXT,
  creator_wallet_address: DataTypes.STRING,
  messages: DataTypes.TEXT,
  created_date: DataTypes.DATE,
  updated_date: DataTypes.DATE
});

export const IdoClaimStatus = sequelize.define("ido_claim_status", {
  claimed_scotty_amount: DataTypes.DECIMAL,
  total_scotty_amount: DataTypes.DECIMAL
});

export const IdoClaimableScottyAmountOfInvestor = sequelize.define(
  "ido_claimable_scotty_amounts_of_investors",
  {
    investor_wallet_address: DataTypes.STRING,
    claimable_scotty_amount: DataTypes.DECIMAL
  }
);

export const IdoInvestedToken = sequelize.define("ido_invested_tokens", {
  token_name: DataTypes.STRING,
  token_symbol: DataTypes.STRING
});

export const IdoInvestment = sequelize.define("ido_investments", {
  investor_wallet_address: DataTypes.STRING,
  id_invested_token: DataTypes.INTEGER,
  invested_token_amount: DataTypes.DECIMAL,
  scotty_amount: DataTypes.DECIMAL,
  id_sale_stage: DataTypes.INTEGER
});

export const IdoSaleStage = sequelize.define("ido_sale_stages", {
  stage_name: DataTypes.STRING,
  stage_enabled: DataTypes.STRING,
  scotty_price_in_usd: DataTypes.DECIMAL,
  hard_cap: DataTypes.DECIMAL,
  start_at: DataTypes.DATE,
  end_at: DataTypes.DATE
});
