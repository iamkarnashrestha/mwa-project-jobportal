const mongoose = require("mongoose");
const JobSchema = mongoose.Schema(
  {
    job_title: String,
    salary: Number,
    description: String,
    company: String,
    category: String,
    featured: Boolean,
    no_of_vacancy:Number,
    applicants: [
      {
        user_id: mongoose.Types.ObjectId,
        fullname: String,
        email: String,
      },
    ],
    location: {
      state: String,
      city: String,
      street: String,
      zip: Number,
    },
    user_details: {
      user_id: mongoose.Types.ObjectId,
      fullname: String,
      email:String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
