import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import { Resend } from 'resend';
import nodemailer from 'nodemailer'
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription

// import {Emailtemplate} from '../../../../components/Emailtemplate'
const resend = new Resend('re_TjBzktuh_5c33Vdr61QnMG416VnsNuDiS');
let users=new Map()
const bcrypt = require('bcrypt');

export async function POST(req) {

    try {
      const { MONGO_URI } = process.env; 
      const { email, password} = await req.json();  // Extract email from request body
     //for connecting with db 
      await mongoose.connect(MONGO_URI);
      // for finding the user 
      let data=await user.find({email:email})
      // checking if user exist or not 
      if(data.length==0){
        return NextResponse.json({ success: false,msg:"User Doesn't Valid"},{status:"200"});
      }
      //comparing the password
   let data1=await bcrypt.compareSync(password,data[0].password)
   // Checking for incorrect pass 
   if(!data1){
    return NextResponse.json({ success: false,msg:"Incorrect Password"},{status:"200"});
   }
   //returning user for correct pass 
   return NextResponse.json({ success: true,user:data},{status:"200"});

       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
