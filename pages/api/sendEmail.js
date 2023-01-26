// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import nodemailer from "nodemailer";
import { transporter} from "../../utils/nodemailer";
import { getSession } from 'next-auth/react';
import Order from "../../model/Order";
import Code from "../../model/code";

import db from "../../utils/db";



export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstname,lastname,email } = req.body;
        const session = await getSession({ req });
        const { user } = session;




        if (!firstname || !email) {
          return res.status(400).send({ message: "Bad request" });
        }
        await db.connect();
        const order=await Order.findOne({user:user._id})
        const code=await Code.findOne({isUsed: false})
        console.log(code)
        console.log(order)

        var items = order.orderItems.map(item => `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${item.slug}</div>`).join('')
        try {
          await transporter.sendMail({
            from: '"The Store Team" <noreply@thestore.com>',
            to: email,
            subject: 'Your Order Details',
            text: 'Thank you for confirming your email address.',
            html: `<h3>Dear ${firstname} ${lastname} </h3>
            <br /> 
            
            <p>Thank you for your purchase!</p>
            <p> code:${code.code}</p>
            <p>Your order details:</p>
            ${items}
          
            <p>Please let us know if you have any questions.</p>
            <p>Best regards,</p>
            <h4>The Store Team</h4>
          

            `,
            // ...generateEmailContent(data),
            // subject: data.subject,
          });
    
        //   console.log('Message sent: %s', info.messageId);
        await Code.findOneAndUpdate({code:code.code},{
          $set:{
            isUsed:true
          }
        })
          return res.status(200).json({ success: true });
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: err.message });
        }
      }
      return res.status(400).json({ message: "Bad request" });
}
// 8xWindows 10 Professional product key license 
// 10xWindows 11 Professional license product key
// 5XWindows 10 Enterprise Digital License
// 5XWindows 11 Enterprise Digital License
// 8XWindows 11 Home Digital License

// 5xOffice 2019 Home and Business for Mac Digital License
// 5xOffice 2019 Professional Plus Digital License
// 5xOffice 2021 Home and Business
// 5xOffice 2021 Home and Business for Mac
// 5xOffice 2021 Home and Student
// 3XOffice 2019 Professional Plus Binding License
// 5xOffice 2021 Professional Plus Digital License
