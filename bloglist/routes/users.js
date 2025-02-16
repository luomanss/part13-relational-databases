import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

import { User } from "../models/index.js";

router.get("/", async (_req, res) => {
  const users = await User.findAll();

  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const blog = await User.create({ username, name, passwordHash });

  res.json(blog);
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const name = req.body.name;
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;

  await user.save();

  res.json(user);
});

export default router;
