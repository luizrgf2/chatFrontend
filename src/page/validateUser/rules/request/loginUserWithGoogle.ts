import { VITE_BACKEND_URL } from "../../../../config"
import { UserInterface } from "../../../../interfaces/userInterface"
import { HTTPResponse, Request } from "../../../../services/request"

export interface loginUserWithGoogleInput{
    accessToken:string
}

export interface loginUserWithGoogleOutput{
    user: UserInterface,
    token:string
}

export async function loginUserWithGoogle(input:loginUserWithGoogleInput):Promise<HTTPResponse<loginUserWithGoogleOutput>>{

    const url = VITE_BACKEND_URL+`/user/login`

    const res = await Request.post({headers:{},url,body:input})

    
    if(res.error) return {status:res.status,error:res.error.error}
    
    const data:loginUserWithGoogleOutput = {
        user:
            {
                ...res.body.user,
                createdAt:new Date(res.body.user.createdAt),
                updatedAt:new Date(res.body.user.updatedAt)
            },
        token:res.body.token
    }

    return {body:data,status:res.status}
}