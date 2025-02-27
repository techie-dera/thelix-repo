"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
dotenv_1.default.config();
// First, create the database if it doesn't exist
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log("✅ Database checked/created successfully.");
        yield connection.end();
    }
    catch (error) {
        console.error("❌ Database creation failed:", error);
        process.exit(1);
    }
});
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging for clean output
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabase(); // Ensure the database exists first
        yield exports.sequelize.authenticate();
        console.log("✅ Database connected successfully.");
        // Sync all models (tables will be created if they don't exist)
        yield exports.sequelize.sync({ alter: true });
        console.log("✅ Tables synced successfully.");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
