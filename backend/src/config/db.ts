import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// First, create the database if it doesn't exist
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log("✅ Database checked/created successfully.");
    await connection.end();
  } catch (error) {
    console.error("❌ Database creation failed:", error);
    process.exit(1);
  }
};

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
    logging: false, // Disable logging for clean output
  }
);

export const connectDB = async () => {
  try {
    await createDatabase(); // Ensure the database exists first
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
    
    // Sync all models (tables will be created if they don't exist)
    await sequelize.sync({ alter: true }); 
    console.log("✅ Tables synced successfully.");

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
