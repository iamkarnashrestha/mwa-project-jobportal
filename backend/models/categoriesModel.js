const mongoose = require("mongoose");

const JobCategorySchema = mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamp: true }
);

module.exports = mongoose.model("JobCategory", JobCategorySchema);
