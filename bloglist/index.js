import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});

try {
  console.log("Connection has been established successfully.");

  const blogs = await sequelize.query("SELECT * FROM blog", {
    type: sequelize.QueryTypes.SELECT
  });

  blogs.forEach(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });

  sequelize.close();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
