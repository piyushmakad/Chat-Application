import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });

      return res
        .status(200)
        .json({ message: "Chat Group Created Successfully!.." });
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res
        .status(200)
        .json({ message: "Chat Groups Created Successfully!..", data: groups });
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const group = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });

      return res
        .status(200)
        .json({ message: "Chat Group Fetched Successfully!..", data: group });
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const { id } = req.params;
      const updatedData = await prisma.chatGroup.update({
        data: {
           title: body.title,
           passcode: body.passcode
        },
        where: {
          id: id,
        }
      });

      return res
        .status(200)
        .json({ message: "Chat Group Updated Successfully!.." , data: updatedData});
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }

    static async delete(req: Request, res: Response) {
      try {
        const { id } = req.params;
        await prisma.chatGroup.delete({
          where: {
            id: id,
          }
        });
  
        return res
          .status(200)
          .json({ message: "Chat Group Deleted Successfully!.." });
      } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong." });
      }
  }
}

export default ChatGroupController;
