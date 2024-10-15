import mongoose from "mongoose";

const archiveTaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

export const ArchiveTask = mongoose.model("ArchiveTask",archiveTaskSchema,"archive");
