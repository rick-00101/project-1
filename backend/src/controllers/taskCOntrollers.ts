import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const addTaskHandler = async (req: Request, res: Response) => {
  try {
    // on hold till schema is updated
    const { work, roomId, todoId, userId } = req.body;

    const userTask = await prisma.user_items.create({
      data: {
        item_id: todoId,
        title: "Canvas Task",
        content: work,
        roomId: roomId,
        type: "todo",
        status: "pending",
        user_id: userId, // Schema constraint bypass logic
      },
    });

    res.status(200).json({
        message : "data updated "
    })
  } catch (error){
    console.log("db error " , error)
  }
};

export const removeTaskHandler = async () => {};
