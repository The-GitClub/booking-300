const db = require("../models");
const nodemailer = require("nodemailer");
const moment = require("moment");


// var respassword = db.Restaurant.distinct("restaurantPassword", { "restaurantPassword" : { $ne : null } } );
//    var resemail = db.Restaurant.distinct("restaurantEmail", { "restaurantEmail" : { $ne : null } } );


module.exports = {
  
  handleEmail: (req, res) => {

    db.Restaurant.distinct("restaurantEmail", function o(error, resemail){
      console.log(`${resemail[0]}`);
    
    db.Restaurant.distinct("restaurantPassword", function p(error, respassword){
      console.log(`${respassword[0]}`);
    
    
    
    
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: `${resemail[0]}`,
        pass: `${respassword[0]}`,
      },
    });

   

    const { name, email, date, time, _id } = req.body;
    let newDate = moment(date).format("LL");

    let mailOptions = {
      from: "Booking300Project@gmail.com",
      to: email,
      subject: `You received a new email from Booking300@gmail.com`,

      html: `<p>Dear ${name},  
      <br><br>
      Your booking has been confirmed for ${newDate} at ${time + ":00"}. 
      <br><br>
      To cancel your booking <a href="http://localhost:4200/user/view">click here.</a>
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
  });
}); //transporter.sendMail bracket
  },
   // handleEmail bracket
}; // exports brakcet
