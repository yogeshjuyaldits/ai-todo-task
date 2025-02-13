import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
});
sequelize
  .sync()
  .then(() => console.log("✅ Database connected & models synchronized"))
  .catch((error) => console.error("❌ Database connection error:", error));

export default sequelize;
