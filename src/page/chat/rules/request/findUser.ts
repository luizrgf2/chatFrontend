import { VITE_BACKEND_URL } from "../../../../config"
import { UserInterface } from "../../../../interfaces/userInterface"
import { HTTPResponse, Request } from "../../../../services/request"

export interface FindUserInput{
    token:string
}

export interface FindUserOutput{
    user:UserInterface
}

export async function FindUser(input:FindUserInput):Promise<HTTPResponse<FindUserOutput>>{

    const url = VITE_BACKEND_URL+`/user/find`

    const headers = {
        authorization:input.token
    }

    const res = await Request.get({headers,url})

    if(res.error) return {status:res.status,error:res.error.error}
    
    const data:FindUserOutput = {
        user:
            {
                ...res.body.user,
                createdAt:new Date(res.body.user.createdAt),
                updatedAt:new Date(res.body.user.updatedAt)
            },
    }
    return {status:200,body:data}


}