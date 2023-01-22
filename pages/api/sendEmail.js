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
        try {
          await transporter.sendMail({
            from: 'Adibbensmina99@gmail.com',
            to: email,
            subject: 'Email Confirmation',
            text: 'Thank you for confirming your email address.',
            html: `<h3>Dear ${firstname} ${lastname} </h3>
            <br /> 
            
            <p>Your order has been confirmed. You Bought Code(s).</p>
            <br /> 
            <p> ${order.orderItems.map(item => item.slug).join(", ")}</p>
          

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
