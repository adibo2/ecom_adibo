import nodemailer from "nodemailer";
import { transporter} from "../../utils/nodemailer";
import { getSession } from 'next-auth/react';

import db from "../../utils/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstname,email,subject,note } = req.body;


        if (!firstname || !email) {
          return res.status(400).send({ message: "Bad request" });
        }
        await db.connect();
        
        var items =  `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${note}</div>`
        try {
          await transporter.sendMail({
            from: email,
            to: 'clientcare@microsoftkeymarket.com',
            subject: subject,
            text: 'Thank you for confirming your email address.',
            html: `<h3>Dear ${firstname} </h3>
            <br />       
            <p>Subject:${subject}</p> 
            <p>Thank you for your purchase!</p>
            <p>the problem email:</p>
            ${items}
          
            <p>Please let us know if you have any questions.</p>
           
            `,
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