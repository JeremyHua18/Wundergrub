require('dotenv').config();

module.exports = {
  HOST: "wundergrubs.c32icb01p6yc.us-east-1.rds.amazonaws.com",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: "WUNDERGrubs",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};