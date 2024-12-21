import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUserController {
  static async index(req: Request, res: Response) {
    try {
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });
      return res.json({ message: "Data Fetched Successfully.", data: users });
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body;
      const users = await prisma.groupUsers.create({
        data: body,
      });
      return res.json({ message: "Group Created Successfully",data:users });
    } catch (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    }
  }
}

export default ChatGroupUserController;
