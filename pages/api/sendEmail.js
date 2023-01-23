// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import nodemailer from "nodemailer";
import { transporter} from "../../utils/nodemailer";
import { getSession } from 'next-auth/react';
import Order from "../../model/Order";

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
        console.log(order)
        // const order = await Order.find({user:user._id},{
        //   _id: 0,
        //   names: {
        //     $map: {
        //       input: "$orderItems",
        //       as: "item",
        //       in: "$$item.slug"
        //     }
        //   },
        // });

        // const leben=await Order.aggregate([
        //   {
        //     $project: {
        //       names: {
        //         $map: {
        //           input: "$orderItems",
        //           as: "item",
        //           in: "$$item.slug"
        //         }
        //       }
        //     }
        //   },
        //   { $unwind: "$names" },
        //   // { $replaceRoot: { newRoot: "$names" } }
        // ])
        // console.log(order[0]._doc.names);
        // order[0]._doc.names.forEach(el=>console.log(el))
        // console.log(leben.map((el)=>{
        //   console.log(el.names)
        // }));
        // const produits=leben.map((el)=>{
        //   return el.names
        // })
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
