import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const waitForDB = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      });
      await connection.end();
      return;
    } catch (error) {
      console.log(`⏳ Waiting for database... (${i + 1}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("❌ MySQL is not ready after multiple attempts.");
};

const createDatabase = async () => {
  await waitForDB();
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
