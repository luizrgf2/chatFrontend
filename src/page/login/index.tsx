import "./index.scss"
import Logo from "../../assets/images/chatAppLogo.webp"
import { GoogleLogo } from "@phosphor-icons/react"
import { FormEvent } from "react"
import { VITE_GOOGLE_OAUTH_URL } from "../../config"
import { LocalStorage } from "../../utils/localStorage"
import {useNavigate} from "react-router-dom"


export function LoginPage(){

    const navigate = useNavigate()

    async function handleLogin(form:FormEvent){
        const token = LocalStorage.getToken()

        if(!token){
            form.preventDefault()
            window.open(VITE_GOOGLE_OAUTH_URL)
        }

        navigate("/chat",{
            replace:true
        })
        
    }

    return(
        <div
            className="containerLogin"
        >
            <main
            >

                <form onSubmit={handleLogin}>
                    <img 
                        src={Logo} 
                        alt="Logo"
                    />

                    <button
                        onClick={()=>{
                            LocalStorage.setRequestType("login")
                        }}
                    >LOGIN<GoogleLogo size={32} /></button>
                    <button
                        onClick={()=>{
                            LocalStorage.setRequestType("register")
                        }}
                    >REGISTRAR<GoogleLogo size={32} fontWeight="bold"/></button>

                </form>

            </main>
        </div>
    )

}