import { Navigate } from "react-router-dom"
import { LocalStorage } from "../../utils/localStorage"

interface props{
    children:JSX.Element
}


export function PrivateRouter({children}:props){
    const token = LocalStorage.getToken()
    
    if(!token){
        return <Navigate to="/" replace></Navigate>
    }
    return children
}