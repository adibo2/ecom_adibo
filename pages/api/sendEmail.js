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

    var items = order.orderItems
      .map(
        (item) =>
          `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${item.slug}</div>`
      )
      .join("");
    console.log(order.orderItems.map((item) => item.slug));
    const desire = order.orderItems.map((item) => item.slug);
    // const code=await Code.findOne({type: order.orderItems.map(item=>item.slug)})
    const codesToSend = [];
    // desire.forEach(async type=>{
    //  const code=await Code.findOne({type: type})
    //  console.log("`````````````````````````code``")
    //  console.log(code)

    //  const unsentCode = await code.codes.filter(code => !code.isUsed);
    //  console.log("`````````````````````````unsentCode``")

    //  console.log(unsentCode)
    //  if (unsentCode) {
    //   const extractedArray = [];
    //    console.log("`````````````````````````quantity``")
    //    console.log(quantity)

    //   codesToSend.push({ type, code: unsentCode.map((item)=>item.code) });
    //   // codesToSend.slice(0,quantity);
    //   console.log("`````````````````````````codeTO send``")
    //   console.log(codesToSend)

    //   unsentCode.isUsed = true;
    //   code.save();
    // }

    // })
    // console.log("`````````````````````````codeTO send``")
    // console.log(codesToSend);
    //   const quantity=order.orderItems.map((a)=> a.amount)

    //   const extractedArray = [];

    //   for (let i = 0; i < quantity.length; i++) {
    //     const amount = quantity[i];
    //     const codes = codesToSend[i].code.slice(0, amount);
    //      extractedArray.push({ type: codesToSend[i].type, code: codes });
    //   }
    //   console.log("````````````````````````` extractedArray``")
    //   console.log(extractedArray);

    await Promise.all(
      desire.map(async (type) => {
        const code = await Code.findOne({ type: type });
        console.log("`````````````````````````code``");
        console.log(code);

        const unsentCode = code.codes.filter((c) => !c.isUsed);
        console.log("`````````````````````````unsentCode``");
        console.log(unsentCode);

        if (unsentCode) {
          codesToSend.push({ type, code: unsentCode.map((item) => item.code) });
          // unsentCode.forEach((c) => {
          //   c.isUsed = true;
          // });
          // await code.save();
        }
      })
    );

    console.log("`````````````````````````codeTO send``");
    console.log(codesToSend);

    const quantity = order.orderItems.map((a) => a.amount);
    const extractedArray = [];

    // for (let i = 0; i < quantity.length; i++) {
    //   const amount = quantity[i];
    //   const codes = codesToSend[i].code.slice(0, amount);
    //   extractedArray.push({ type: codesToSend[i].type, code: codes });
    // }
    console.log("order: ", order);
    order.orderItems.forEach(item=>{
      const codesToSendItem = codesToSend.find(codesToSend => codesToSend.type === item.slug);
      if (codesToSendItem) {
        const codes = codesToSendItem.code.slice(0, item.amount);
        extractedArray.push({ type: item.slug, code: codes });
      }
    })

    console.log("````````````````````````` extractedArray``");
    console.log(extractedArray);

    for (const item of extractedArray) {
      const type = item.type;
      const codes = item.code;

      for (const code of codes) {
        await Code.updateOne(
          { type: type, "codes.code": code },
          { $set: { "codes.$.isUsed": true } }
        );
      }
    }
    // const code=await Code.find({type: { $in : order.orderItems.map(item=>item.slug) }  })

    // const unusedCodes = code.codes.filter(c => !c.isUsed);
    // const unusedCodes = code.map(item => {
    //   return {
    //     type: item.type,
    //     unusedcodes: item.codes.filter(code => !code.isUsed)
    //   };
    // });
    // console.log(unusedCodes)
    console.log("sdmlsmdlsmdlsmdlsmdlsdmlsdmsdlsmdslmdlskdlmsdkslmdksmldksm");
    // const quantity=order.orderItems.reduce((a,c)=> a + c.amount,0)
    // const quantity=order.orderItems.map(c =>{
    //   return{
    //     amount:c.amount
    //   }
    // })

    // console.log(quantity.map(item=>item.amount))

    // const activationCodes = unusedCodes[0].slice(0, quantity);
    //     const activationCodes = unusedCodes.map((item)=>{
    //       return {
    //         type: item.type,
    //         // keys:item.unusedcodes.slice(0,quantity.map(item=>item.amount))
    //         keys:sentWindowsKeys
    //       }

    // })

    // console.log(activationCodes)
    try {
      await transporter.sendMail({
        from: '"The Store Team" <noreply@thestore.com>',
        to: email,
        subject: "Your Order Details",
        text: "Thank you for confirming your email address.",
        html: `<h3>Dear ${firstname} ${lastname} </h3>
            <br /> 
            
            <p>Thank you for your purchase!</p>

              <p> code:${extractedArray
                .map(
                  (c) => c.code.map((sec)=>(

                    `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${c.type} : ${sec}</div>`
                  ))
                )
                }</p> 

                <p>Here is some video link to help you:</p>
                <a href="https://www.youtube.com/watch?v=SfRrFKIh2x0&list=LL&index=3">How to Activate Microsoft Office Product Key ?</a>.
                <br></br>
                <a href="https://www.youtube.com/watch?v=_Czrjp3oG20&list=LL&index=4">How to Activate windows Keys?</a>. <br></br>

                <p>Please let us know if you have any questions.</p>
                <div>
                For any problem with your key (invalid code, download problem, or other) please send us your error message (capture of your entire screen).<br></br>
                <a href="mailto:clientcare@microsoftkeymarket.com">Contact clientcare@microsoftkeymarket.com </a> and your key will be replaced within 24 hours maximum (response within a few hours).     
                </div>

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
// 8xWindows 10 Professional product key license
// 10xWindows 11 Professional license product key
// 5XWindows 10 Enterprise Digital License
// 5XWindows 11 Enterprise Digital License
// 8XWindows 11 Home Digital License

//  <p> code:${extractedArray
// .map(
//   (c) =>
//     `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${c.type}: ${c.code.map(el=>el)}</div>`
// )
// .join("")}</p>

// 5xOffice 2019 Home and Business for Mac Digital License
// 5xOffice 2019 Professional Plus Digital License
// 5xOffice 2021 Home and Business
// 5xOffice 2021 Home and Business for Mac
// 5xOffice 2021 Home and Student
// 3XOffice 2019 Professional Plus Binding License
// 5xOffice 2021 Professional Plus Digital License

{
  /* <p> code:${activationCodes.map(c=>`<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">${c.type} : ${c.keys.map(el=>el.code)}</div>`).join('')}</p> */
}

// after the client paid his order i want to send to him code activation via email and every code has a type of windows keys and the quantity and the amount of windows keys the client order for example client bought 2 activation code for windows 10 pro and windows 11 pro and send to the client by email the code for windows 10 pro and for windows 11 pro and updatate the code that has been sent with find() it should be mentioned that in my databse 2 windows 10 and 11 pro code are bought by client  and that code is from mongodb i want that every type of windows keys has array of code in the schema mogoose and if someone used update the key that has been used in the array and if that is sent it should not be present in the database because the client already used it Nextjs mongodb
// const sentWindowsKeys = [];
// let currentIndex = 0;
// for (let i = 0; i < quantity.length; i++) {
//   const amount = order.orderItems[i].amount;
//   sentWindowsKeys.push(unusedCodes.map(item=>item.unusedcodes).slice(currentIndex, currentIndex + amount));
//   currentIndex += amount;
// }
// // const activationCodes = unusedCodes[0].slice(0, quantity);
// const activationCodes = unusedCodes.map((item)=>{
//   return {
//     type: item.type,
//     // keys:item.unusedcodes.slice(0,quantity.map(item=>item.amount))
//     keys:sentWindowsKeys
//   }

// })

// 2Windows 11 Professional license product key-5PC
// 3XWindows 11 Enterprise Digital License
// 1XWindows 11 Home Digital License-5PC

// 2xOffice 2019 Professional Plus Digital License-5PC
// 3xOffice 2021 Home and Business for Mac
// 3XOffice 2019 Home and Business for Mac Digital License
