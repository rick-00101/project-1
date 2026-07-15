import { Request, RequestHandler, Response } from "express";
import {prisma} from "../utils/prisma";
import crypto from 'crypto';
import { redisSession } from "../config/redis";

export const googleAuthHandler= async ( req : Request , res :Response)=>{

    try{
        const {email} = req.body;
        if(!email) 
        {
             res.status(401).json({
        message : "email not found at auth "})
        return ;
             }
       
        //supabase mai entry agar nahi hai toh 

        const user = await prisma.user_details.upsert({
            where :{email : email} , 
            update :{},
            create:{
                email : email
            },

        })

        //fir sessionid banao using crypto 
        //// Token ke alternate me hum ek ultra-secure 32-byte ka random hex string bana rahe hain
        const  sessionId= crypto.randomBytes(32).toString("hex")

        //sessionset karo 

        await  redisSession.setSession(sessionId , {
            userId : user.user_id ,
            email : user.email
        });
        // 5. 🧠 FIRST PRINCIPLE: Secure HTTP-Only Cookie Delivery
        // Yeh chabi (sessionId) hum frontend ke browser ko saunp rahe hain ek secure packet me

        res.cookie("sessionId", sessionId, {
      httpOnly: true, // 🛡️ JavaScript is chabi ko padh nahi sakti (XSS Protection)
      secure: process.env.NODE_ENV === "production", // Production me sirf HTTPS par chalega
      sameSite: "lax", // CSRF attack se protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din ki umar cookie ki bhi
    });

    return res.status(200).json({
      message: "Authentication successful via Google",
      user: {
        userId: user.user_id,
        email: user.email,
      },
    });
     }catch(error){
        console.error("Google Auth Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error during authentication" });

    }
   

}

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (sessionId) {
      await redisSession.delSession(sessionId);
    }

    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error during logout" });
  }
};

