import { socket } from "../../../../socket"

export interface MessagePublishInterface{
    idUser:string,
    userName:string,
    message:string
}

interface props{

  func:(item:MessagePublishInterface)=>void

}


export function ReceiveMessage({func}:props){
    socket.on("message",(msg:MessagePublishInterface)=>{
        func(msg)
    })

}
