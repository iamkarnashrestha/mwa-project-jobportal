const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  addNewJob,
  getJobById,
  updateJob,
  deleteJob,
  getAppliedJobs,
  getFeaturedJobs,
  getPostedJobs,
  applyJob,
  getAppliedCheck,
  getJobNumberByCategory,
  filterByCategory,
} = require("../controllers/JobsController");

router.get("/featured", getFeaturedJobs);
router.get("/noOfJobs", getJobNumberByCategory);
router.get("/", getAllJobs);
router.post("/", addNewJob);
router.get("/:job_id", getJobById);
router.put("/:job_id", updateJob);
router.delete("/:job_id", deleteJob);


router.get("/filterByCategory/:category", filterByCategory);
router.get("/appliedJobs/:user_id", getAppliedJobs);
router.get("/postedJobs/:user_id", getPostedJobs);
router.put("/apply/:job_id", applyJob);
router.get("/appliedCheck/:job_id", getAppliedCheck);

module.exports = router;
