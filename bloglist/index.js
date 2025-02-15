import dotenv from "dotenv";
import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import express from "express";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
  }
);

Blog.sync();

const app = express();

app.use(express.json());

app.get("/api/blogs", async (_req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const { author, title } = req.body;

  const blog = await Blog.create({ author, title });

  res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  await Blog.destroy({
    where: {
      id,
    },
  });

  res.json({
    message: "Blog deleted",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}
);
