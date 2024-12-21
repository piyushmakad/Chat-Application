import { Request ,Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayLoadType{
    name:string;
    email:string;
    provider:string;
    oauth_id:string;
    image?:string;
}

class AuthController {

    static async login(req:Request,res:Response){
        try{
            const body: LoginPayLoadType = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            })

            if(!findUser){
                findUser = await prisma.user.create({
                    data: body
                })
            }
            let JWTPayload = {
                name: body.name,
                email: body.email,
                id:findUser.id
            }

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET_KEY,{
                expiresIn: "60d"
            });

            return res.status(200).json({
                message: "Logged In.",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`
                }
            })
        }
        catch(error){
            return res.status(500).json({message: "Something Went Wrong."})
        }
    }
}

export default AuthController;