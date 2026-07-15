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

    const userTask = await prisma.user_items.create({
      
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

export const removeTaskHandler = async () => {};
