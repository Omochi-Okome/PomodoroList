import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model("List", listSchema, "list");
