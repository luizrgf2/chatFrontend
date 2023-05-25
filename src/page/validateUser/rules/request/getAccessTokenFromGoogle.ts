import { VITE_BACKEND_URL } from "../../../../config"
import { HTTPResponse, Request } from "../../../../services/request"

export interface getAccessTokenFromGoogleInput{
    code:string
}

export interface getAccessTokenFromGoogleOutput{
    accessToken:string
}

export async function getAccessTokenFromGoogleRequest(input:getAccessTokenFromGoogleInput):Promise<HTTPResponse<getAccessTokenFromGoogleOutput>>{
    const {code} = input

    const url = VITE_BACKEND_URL+`/user/google/${code}`
    const res = await Request.get({headers:{},url:url})

    
    if(res.error) return {status:res.status,error:res.error.error}
    const data = res.body as getAccessTokenFromGoogleOutput

    return {body:data,status:res.status}
}