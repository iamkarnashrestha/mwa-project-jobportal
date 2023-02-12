const jobsModel = require("../models/jobsModel");
const userModel = require("../models/users");
const mailer=require("../config/mailer")
module.exports.getAllJobs = async (req, res, next) => {
  try {
    const { user_id } = req.token;
    const results = await jobsModel.find();
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.addNewJob = async (req, res, next) => {
  try {
    const { _id, fullname,email } = req.token;
    let user_details = {
      user_id: _id,
      fullname: fullname,
      email:email
    };

    const new_job = req.body;

    const results = await jobsModel.create({
      ...new_job,
      user_details,
    });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.getJobById = async (req, res, next) => {
  try {
    const { user_id } = req.token;
    const { job_id } = req.params;
    const job = await jobsModel.findOne({ _id: job_id, user_id });
    res.json({ success: true, results: job });
  } catch (error) {
    next(error);
  }
};

module.exports.updateJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    
    const {
      job_title,
      salary,
      description,
      location,
      category,
      company,
      featured,
      no_of_vacancy,
    } = req.body;

    const results = await jobsModel.updateOne(
      { _id: job_id },
      {
        $set: {
          job_title,
          salary,
          description,
          location,
          category,
          company,
          no_of_vacancy,
          featured,
        },
      }
    );
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteJob = async (req, res, next) => {
  try {
    const { user_id } = req.token;
    const { job_id } = req.params;
    const results = await jobsModel.deleteOne({ _id: job_id, user_id });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.getFeaturedJobs = async (req, res, next) => {
  try {
    const results = await jobsModel.find({ featured: true });
    res.json({ success: true, results: results });
  } catch (error) {
    next(error);
  }
};

module.exports.getAppliedJobs = async (req, res, next) => {
  try {
    const { email } = req.token;
    const results = await jobsModel.find({
      "applicants.email": { $all: [email] },
    });

    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.getPostedJobs = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const results = await jobsModel.find({ "user_details.user_id": user_id });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.getAppliedCheck = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const { email } = req.token;
    const results = await jobsModel.findOne({
      _id: job_id,
      "applicants.email": email,
    });

    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.applyJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const job=await jobsModel.findOne({_id:job_id})
    const { _id, fullname, email } = req.token;

    const applicants = {
      _id: _id,
      fullname: fullname,
      email: email,
    };

    const results = await jobsModel.updateOne(
      { _id: job_id },
      {
        $push: { applicants: applicants },
      }
    );

//sending email to applicant
    let mailOptions = {
        from: 'mwaproject@gmail.com',
        to: email,
        subject: 'JOb Applied for'+job.job_title,
        text: `Dear ${fullname},
        You job application for ${job.job_title} in company ${job.company} is applied successfully.
        The Employer of this job will getback to you soon.

        Thank You
        MWA Job Portal
        `
      };
console.log(job)
      let mailOptionsEmployeer = {
        from: 'mwaproject@gmail.com',
        to: job.user_details.email,
        subject: 'JOb Application for'+job.job_title,
        text: `Dear ${job.user_details.fullname},
        ${fullname} has applied for ${job.job_title} that you have posted.
        Please get back to her/him soon.
        Thank You
        MWA Job Portal
        `
      };
  
     sendEmail(mailOptions);
     sendEmail(mailOptionsEmployeer)


    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.getJobNumberByCategory = async (req, res, next) => {
  try {
    const results = await jobsModel.aggregate([
      {
        $group: {
          _id: "$category",
          num_job: { $sum: 1 },
        },
      },
    ]);

    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

function sendEmail(mailOptions){
    mailer.transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
}

module.exports.filterByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
     
      const results = await jobsModel.find({
        category: category,
      });
  
      res.json({ success: true, results });
    } catch (error) {
      next(error);
    }
  };