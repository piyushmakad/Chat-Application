import { Server,Socket } from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket{
  room?:string,
}

export function  setupSocket(io: Server) {
    //Server level event thats why socket is needed in (args)
    io.use((socket: CustomSocket, next) => {
      const room = socket.handshake.auth.room || socket.handshake.headers.room
      if(!room){
        return next(new Error("Invalid Room Id."))
      }
      socket.room = room
      next()
    })
  io.on("connection", (socket: CustomSocket) => {

    //join the room
    socket.join(socket.room);
    
    console.log("Socket connect:", socket.id);
    

    socket.on("message", async (data)=> {
      console.log("Server Side message", data);
      //broadcast means other than me everyone on server gets the meesage
      //socket.broadcast.emit("message" ,data);
       
      //sending to data to room only now
      await prisma.chats.create({
        data: data,
      })
      socket.to(socket.room).emit("message: ",data);
    })
    //socket level event so no need of socket as (args)
    socket.on("disconnect", () => {
      console.log("User Disconnect", socket.id);
    });
  });
}
