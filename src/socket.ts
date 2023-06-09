import { io } from "socket.io-client";
import { VITE_WEBSOCKET_URL } from "./config";


if(!VITE_WEBSOCKET_URL) throw new Error("VITE_WEBSOCKET_URL not be is empty")


export const socket = io(VITE_WEBSOCKET_URL,{
    forceNew: true,
    secure:true,
    timeout: 2000,
})