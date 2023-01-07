import nodemailer from "nodemailer";

const email=process.env.Email;
const email_pass=process.env.Email_Pass

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass:email_pass,
  },
});

// export const mailOptions = {
//   from: email,
//   to: email,
// };