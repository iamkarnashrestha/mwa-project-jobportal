const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const { SECRET } = require("../config.json");
const mailer=require("../config/mailer")
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user_db = await usersModel.findOne({ email });
    const match = await bcrypt.compare(password, user_db.password);
    if (!match) return next(new Error("User authentication failed"));
    const token = jwt.sign(
      {
        _id: user_db._id,
        fullname: user_db.fullname,
        email: user_db.email,
        role: user_db.role,
      },
      SECRET
    );
    console.log(token);
    res.json({ success: true, results: token });
  } catch (error) {
    next(error);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const new_user = req.body;
    console.log(new_user);
    const hashed_password = await bcrypt.hash(new_user.password, 10);
    const results = await usersModel.create({
      ...new_user,
      password: hashed_password,
    });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.mails = async (req, res, next) => {
  try {

    let mailOptions = {
      from: 'mwaproject@gmail.com',
      to: 'send2arjunsubedi@gmail.com',
      subject: 'Nodemailer Project',
      text: 'Hi from your nodemailer project'
    };

    mailer.transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    next(error);
  }
};


module.exports.getUserById = async (req, res, next) => {
  try {
    const { email } = req.params;
    const results = await usersModel.findOne({ email: email });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { fullname, email, role } = req.body;
    const results = await usersModel.updateOne(
      { _id: user_id },
      {
        $set: {
          fullname,
          email,
          role,
        },
      }
    );
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.totalUsers = async (req, res, next) => {
  try {
    const results = (await usersModel.find()).length;
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};
