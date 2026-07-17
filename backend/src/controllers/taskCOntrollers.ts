import { Request, Response } from "express";
import { prisma } from "../utils/prisma";


export const addTaskHandler = async (req: Request, res: Response) => {
  try {
    // on hold till schema is updated
    const { content, roomId, todoid } = req.body;
    const user =req.user?.userId;

    if (!user) {
  throw new Error("Unauthorized: no user_id found");
  // or return res.status(401).json({ error: "Unauthorized" });
}

     await prisma.user_items.create({
      
      data: {
        item_id: todoid,
        title: "Canvas Task",
        content: content ,
        roomId: roomId,
        type: "todo",
        status: "pending",
        user_id: user, // Schema constraint bypass logic
      }
    });

    res.status(200).json({
        message : "data updated "
    })
  } catch (error){
    res.status(500).json({
      message : "error adding task "

    })
    console.log("db error " , error)
  }
};

export const removeTaskHandler = async (req : Request , res:Response) => {
try{
  const item_id = req.body.item_id;

  if(!item_id){res.status(404).json({
    message : "item_id not recieved"
  })}

  await prisma.user_items.delete({
    where:{
      item_id : item_id
    }
  })

  return res.status(200).json({
      success: true,
      message: "Task successfully deleted from database"
    });



}catch(error){
  res.status(404).json({
    mesage : error
  }
  )

}
 };

export const presistdata =async (req : Request ,res :Response)=>{
  try{
      const roomId = req.params.roomId as string;
      if(!roomId){
        res.status(404).json({
          message : "room id not found"
        })
      }

  const existingTask = await prisma.user_items.findMany({
    where:{
      roomId : roomId
    },
    orderBy:{
      createdAT : "asc"
    }
  })

  return res.status(200).json({
    data : existingTask
  })

  }catch(error){
    res.status(404).json({
      message:"error try wala"
    }
  )}


}