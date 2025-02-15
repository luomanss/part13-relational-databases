import express from "express";
import { PORT } from "./util/config.js";
import { connect } from "./util/db.js";
import blogsRouter from "./routes/blogs.js";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);

await connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
