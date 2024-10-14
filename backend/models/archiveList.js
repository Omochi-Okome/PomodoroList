import mongoose from "mongoose";

const archiveListSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

export const ArchiveList = mongoose.model("archiveList",archiveListSchema,"archive");
