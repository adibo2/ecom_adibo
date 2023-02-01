// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodemailer from "nodemailer";
import { transporter } from "../../utils/nodemailer";
import { getSession } from "next-auth/react";
import Order from "../../model/Order";
import Code from "../../model/code";

import db from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstname, lastname, email } = req.body;
    const session = await getSession({ req });
    const { user } = session;

    if (!firstname || !email) {
      return res.status(400).send({ message: "Bad request" });
    }
    await db.connect();
    const order = await Order.findOne({ user: user._id });
    console.log(order);






    var items = order.orderItems.map(item => `<div style="border: 1px solid #1e1e38; padding: 10px; margin-bottom: 10px;">${item.amount}x${item.slug}</div>`).join('')
   
    console.log("sdmlsmdlsmdlsmdlsmdlsdmlsdmsdlsmdslmdlskdlmsdkslmdksmldksm");

    try {
      await transporter.sendMail({
        from: '"The Store Team" <noreply@thestore.com>',
        to: email,
        subject: "Your Order Details",
        text: "Thank you for confirming your email address.",
        html: `<h3>Dear ${firstname} ${lastname} </h3>     
            <p>Your order details:</p>
            ${items}     
            <p>Please let us know if you have any questions.</p>
            <p>Best regards,</p>
            <h4>The Store Team</h4>
          

            `,
        // ...generateEmailContent(data),
        // subject: data.subject,
      });
      // const updates = activationCodes.map(c => Code.updateOne({ type: order.orderItems.map(item=>item.slug), "codes.code": c.code }, { $set: { "codes.$.isUsed": true } }));
      // await Promise.all(updates);
      // <p> code:${activationCodes.map(c=>c.type)} :${activationCodes.map(c => c.code)}</p>

      // await Code.updateOne({ type: order.orderItems.map(item=>item.slug), "codes.code": unusedCodes[0].code }, { $set: { "codes.$.isUsed": true } });
      // await Code.findOneAndUpdate({code:code.code},{
      //   $set:{
      //     isUsed:true
      //   }
      // })
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
}