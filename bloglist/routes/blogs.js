import express from "express";

const router = express.Router();

import { Blog } from "../models/index.js";

router.get("/", async (_req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { author, title } = req.body;

  const blog = await Blog.create({ author, title });

  res.json(blog);
});

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const likes = req.body.likes;
  const blog = await Blog.findByPk(id);

  blog.likes = likes;

  await blog.save();

  res.json(blog);
});

export default router;