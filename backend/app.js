import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./util/database.js";
import dotenv from "dotenv";

import dashboardRoutes from "./routes/dashboardRoute.js";
import taskRoutes from "./routes/taskRoute.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/task", taskRoutes);
app.use("/dashboard", dashboardRoutes);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB:", err));
