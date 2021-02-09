const db = require("../models");
const nodemailer = require("nodemailer");
const moment = require("moment");

module.exports = {
  handleEmail: (req, res) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "Booking300Project@gmail.com",
        pass: "Password300",
      },
    });

    const { name, email, date, time, _id } = req.body;
    let newDate = moment(date).format("LL");

    let mailOptions = {
      from: "Booking300Project@gmail.com",
      to: email,
      subject: `You received new email from Booking300@gmail.com`,

      html: `<p>Dear ${name},  
      <br><br>
      Your appointment has been confirmed for ${newDate} at ${time + ":00"}. 
      <br><br>
      To cancel appointment <a href="http://localhost:4200/user/view">click here.</a>
      <br><br>
      Best regards.
      </p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
      } else {
        res.status(200).json({
          status: info.response,
        });
      }
    });
  },
};
