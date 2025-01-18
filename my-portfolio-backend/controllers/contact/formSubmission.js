const nodemailer = require("nodemailer");

const formSubmission = (req, res) => {
  console.log("form submission .js");
  console.log(req.body);
  const { name, email, message, number } = req.body;
  // create a transporter object

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.OAUTH_PASSWORD,
    },
  });

  // configure the email options
  const getFormMailOptions = {
    from: email,
    to: process.env.MAIL_ID,
    subject: `You have received a new message from ${name}`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-top: 3px solid #69b1cc; border-bottom: 3px solid #69b1cc;">
  <p style="font-size: 16px; color: #333; margin: 0; padding-bottom: 10px;">Form Data:</p>
  <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Phone No.:</strong> ${number}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Message:</strong> ${message}</p>
  </div>
</div>

    `,
  };
  //   Get Form
  transporter.sendMail(getFormMailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error While sending email");
    } else {
      res.json({
        success: true,
        // accessToken: accessToken,
        message: "Form Submitted Successful",
      });
      // -----------------------
      // Now send confirmation email to the user (sender)
      const confirmationMailOptions = {
        from: "noreply@sahityaneupane.com.np",
        to: email, // Sender's email address (from the form)
        subject: "I have received your form submission",
        html: `Dear ${name},<br><br>
         Thank you for reaching out! I have received your message and will get back to you soon.<br><br>
         \n
             <p>Form You Submitted is:</p>
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-top: 3px solid #69b1cc; border-bottom: 3px solid #69b1cc;">
  <p style="font-size: 16px; color: #333; margin: 0; padding-bottom: 10px;">Form You Submitted is:</p>
  <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Phone No.:</strong> ${number}</p>
    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Message:</strong> ${message}</p>
  </div>
</div>

         
         \n 
     <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
  <p style="margin: 0; font-weight: bold;">Best Regards,</p>
  <p style="margin: 0; font-weight: bold; font-size: 16px; color: #4CAF50;">Sahitya Neupane</p>
  <p style="margin: 0;">Web Developer</p>
  <p style="margin: 5px 0;">
    <a href="https://www.linkedin.com/in/sahitya-neupane-3b0697212/" target="_blank" style="color: #0073b1; text-decoration: none; font-weight: bold;">
      LinkedIn
    </a> 
    | 
    <a href="https://www.sahityaneupane.com.np/" target="_blank" style="color: #0073b1; text-decoration: none; font-weight: bold;">
      sahityaneupane.com.np
    </a>
  </p>
  <p style="margin: 0;">+1 (647) 919-1596 | 
    <a href="mailto:neupanesahitya1@gmail.com" target="_blank" style="color: #333; text-decoration: none; font-weight: bold;">
      neupanesahitya1@gmail.com
    </a>
  </p>
  <p style="margin: 15px 0; font-size: 14px; color: #555;">
    <strong>Contact Me:</strong> Whether it's a smaller project or a fully-fledged web development/design task.
  </p>
</div>
`,
      };

      // Send the confirmation email to the user
      transporter.sendMail(confirmationMailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send("Error while sending confirmation email.");
        } else {
          console.log("Confirmation email sent successfully: " + info.response);
          //   res.json({
          //     message: "Form has been submitted successfully.",
          //   });

          res.json({
            success: true,
            // accessToken: accessToken,
            message: "Form Submitted Successful",
          });
        }
      });
    }
  });
};

module.exports = formSubmission;
