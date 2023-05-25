import { FormEvent, useEffect, useState } from "react"
import "./index.scss"
import { UserInterface } from "../../interfaces/userInterface"
import { useNavigate } from "react-router-dom"
import { LocalStorage } from "../../utils/localStorage"
import { FindUser } from "./rules/request/findUser"
import { PaperPlaneRight } from "@phosphor-icons/react"
import { SendMessage } from "./rules/request/senMessage"
import { MessageComponent, MessageInterface } from "../../components/message"
import { MessagePublishInterface } from "./rules/request/connectSocket"
import { socket } from "../../socket"


export function ChatPage(){


    const [user,setUser] = useState<UserInterface|undefined>()
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState<MessageInterface[]>([])
    const navigate = useNavigate()

    async function handleFindUser(){
        const token = LocalStorage.getToken()
        if(!token) return navigate("/",{replace:true})

        const user = await FindUser({token:token})

        if(user.error) {
            LocalStorage.removeToken()
            navigate("/",{replace:true})
            alert(user.error)
        }

        if(user.body){
            setUser(user.body.user)
        }

    }

    function validateMessageToSend(){

        if(message.length === 0) return false

        let allCharBeSpaces = false

        for(const chat of message){
            if(chat !== " ") {
                allCharBeSpaces = true
                break
            }
        }

        if(!allCharBeSpaces) return false
        return true
    }

    async function handleSendMessage(){
        console.log(message)
        const token = LocalStorage.getToken()
        if(!token) return navigate("/",{replace:true})

        if(!validateMessageToSend()) return
        const send = await SendMessage({
            token:token,
            message:message.trim()
        })

        if(send.error){
            if(send.status === 401){
                navigate("/",{replace:true})
            }
            LocalStorage.removeToken()
            alert(send.error)
        }
        setMessage("")

    }

    async function handleReceiveMessage(){
        socket.on("message",(msg:MessagePublishInterface)=>{
            if(msg.idUser === user?.id){
                setMessages(list=>[...list,{
                    message:msg.message,
                    photoUrl:"",
                    type:"self",
                    userName:msg.userName
                }])
            }else{
                setMessages(list=>[...list,{
                    message:msg.message,
                    photoUrl:"",
                    type:"user",
                    userName:msg.userName
                }])
            }
        })

    }

    async function submitMessage(form:FormEvent){
        form.preventDefault()
        await handleSendMessage()
    }

    useEffect(()=>{
        handleFindUser()
    },[])


    useEffect(()=>{
        if(user){

            handleReceiveMessage()
        }

    },[user])


    useEffect(()=>{
        document.querySelector("#chat")?.scrollBy(0,1000)
    },[messages])

    return (
        <div
            id="containerChat"
        >
            <main>
                <header>

                    {
                        user !== undefined &&
                            <>
                                <img src={user.pictureUrl} alt="User" referrerPolicy="no-referrer"/>
                                <h1>{user.name}</h1>
                            </>

                    }
                </header>
                <div id="chat">

                    {
                        messages.map(item=><MessageComponent {...item}></MessageComponent>)
                    }

                </div>

                <form onSubmit={submitMessage}>
                    <textarea
                        maxLength={100}
                        value={message}
                        onChange={(value)=>{
                            setMessage(value.target.value)
                        }}
             
                    ></textarea>
                    <button><PaperPlaneRight size={32} /></button>
                </form>
            </main>
        </div>
    )

}