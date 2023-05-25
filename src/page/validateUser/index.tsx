import {  useNavigate } from "react-router-dom"
import "./index.scss"
import { useEffect, useRef } from "react"
import { getAccessTokenFromGoogleRequest } from "./rules/request/getAccessTokenFromGoogle"
import { LocalStorage } from "../../utils/localStorage"
import { registerUserWithGoogle } from "./rules/request/registeUserWithGoogle"
import { loginUserWithGoogle } from "./rules/request/loginUserWithGoogle"


export function ValidationPage(){

    const code = useRef("")

    const navigate = useNavigate()

    async function handleRegisterUser(){

        const token = LocalStorage.getAccessTokenGoogle()
        if(token){
            const res = await registerUserWithGoogle({
                accessToken:token
            })

            if(res.error) return alert(res.error)
            alert("Sucesso no cadastro!")

        }else{
            alert("Access Token inválido!")
        }

    }

    async function handleLoginUser(){

        const token = LocalStorage.getAccessTokenGoogle()
        if(token){
            const res = await loginUserWithGoogle({
                accessToken:token
            })

            if(res.error) return alert(res.error)
            LocalStorage.setToken(res.body?.token||"")
            alert("Sucesso no login!")

        }else{
            alert("Access Token inválido!")
        }

    }

    async function handleProcessAuthorization(){
        
        const requestType = LocalStorage.getRequestType()
        
        if(requestType === undefined) return navigate("/",{replace:true})
        
        const res = await getAccessTokenFromGoogleRequest({
            code:code.current
        })

        if(res.error) return alert(res.error)

        LocalStorage.setAccessTokenGoogle(res.body?.accessToken as string)


        if(requestType === "register"){
            await handleRegisterUser()
            navigate("/",{replace:true})
        }else if(requestType === "login"){
            await handleLoginUser()
            navigate("/chat",{replace:true})
        }

    }

    function handleCodeFromQueryString(){
        const query = window.location.search.replace("?","").split("&").map(item=>({
            name:item.split("=")[0],
            value:item.split("=")[1]
        }))

        const codeQuery = query.find(value=>value.name === "code")
        if(codeQuery === undefined) {
            navigate("/",{replace:true})
        }else if(code.current.length === 0){
            code.current = codeQuery.value
        }
    }


    useEffect(()=>{
        handleCodeFromQueryString()
        handleProcessAuthorization()
    })




    return (
        <div
            id="containerValidation"
        >
            <h1>Confirmação</h1>
            <h3>O usuário foi confirmado com sucesso!</h3>
        </div>
    )

}