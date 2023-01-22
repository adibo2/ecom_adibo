// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from './../../utils/db';
import Admin from './../../model/admin'
import bcrypt from 'bcryptjs'
import Product from '../../model/Product';
import { data_windows } from '../../components/data';
import { data_office } from '../../components/data';
import Productoffice from '../../model/Productoffice';
import { search } from '../../components/data';
import Fetch from '../../model/search';
import Review from '../../model/reviews';
import User from '../../model/User';
import Order from '../../model/Order';
import Code from '../../model/code';
import { code_data } from '../../model/code';

const data = {
  users: [
    {
      firstname: 'Wraith',
      lastname: 'paragon',   
      email:"Wraith@example.com",
      repeatemail: 'Wraith@example.com',
      password: bcrypt.hashSync('tahasalim2015'),
      isAdmin: true,

    },
    {
      firstname: 'Revenant',
      lastname: 'paragon',   
      email:"Revenant@example.com",
      repeatemail: 'Revenant@example.com',
      password: bcrypt.hashSync('tahasalim2017'),
      isAdmin: true,

    },
  ],}


export default async function handler(req, res) {
  await db.connect();
  // await Admin.deleteMany();
  // await Admin.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data_windows);
  await Code.deleteMany();
  await Code.insertMany(code_data)
  // await User.deleteMany()
  // await User.insertMany(data.users)
  // await Order.deleteMany()
  // await Productoffice.deleteMany();
  // await Productoffice.insertMany(data_office);
  // await Product.find().populate({ path: 'reviews', model: Review });
  // await Fetch.deleteMany();
  // await Fetch.insertMany(search);
  await db.disconnect();
  res.status(200).json({ name: 'message send succesfully' })
}
