// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import nodemailer from "nodemailer";
import { transporter} from "../../utils/nodemailer";



export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstname,lastname,email } = req.body;

        if (!firstname || !email) {
          return res.status(400).send({ message: "Bad request" });
        }
    
        try {
          await transporter.sendMail({
            from: 'Adibbensmina99@gmail.com',
            to: email,
            subject: 'Email Confirmation',
            text: 'Thank you for confirming your email address.',
            html: `<p>Thank you ${firstname} ${lastname} for you purchases.</p>`,
            // ...generateEmailContent(data),
            // subject: data.subject,
          });
    
        //   console.log('Message sent: %s', info.messageId);
          return res.status(200).json({ success: true });
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: err.message });
        }
      }
      return res.status(400).json({ message: "Bad request" });
}
