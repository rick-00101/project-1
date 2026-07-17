import { Request, Response, NextFunction } from "express";
import { redisSession } from "../config/redis";


declare global{
    namespace Express{
        interface Request{
            user?:{
                userId : string ;
                email  : string;
                
            }
        }
    }
}

export const protectRoute =  async (req  : Request , res : Response , next : NextFunction)=>{

    try{
        const sessionId = req.cookies?.sessionId;

        if(!sessionId)  {
            return  res.status(401).json({
                message : "sessionId not found"
            })
        }

        const userData = await redisSession.getSession(sessionId)

        if(!userData){
            return (
                res.status(401).json({
                    message : "userdata not found"
                })
            )
        }

        req.user=userData

        next();

    }catch(error) {
        console.error("Middleware Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });

    }
}


