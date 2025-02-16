import express from "express";
import "express-async-errors";
import { BaseError } from "sequelize";
import { PORT } from "./util/config.js";
import { connect } from "./util/db.js";
import blogsRouter from "./routes/blogs.js";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.use((err, _req, res, next) => {
  if (err instanceof BaseError) {
    res.status(500).json({
      message: err.message,
    });
  } else {
    next(err);
  }
});

await connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
