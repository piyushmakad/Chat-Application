import {io, Socket} from "socket.io-client"
import Env from "./env";
let socket:Socket;
//ensures only one client instance of socket for the application 

export const getSocket = ():Socket => {
    //if no socket connection for client connect to it
   if(!socket){
    socket = io(Env.BACKEND_URL, {autoConnect: false});
   }
   return socket;
}