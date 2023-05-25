import { VITE_BACKEND_URL } from "../../../../config"
import { HTTPResponse, Request } from "../../../../services/request"

export interface SenMessageInput{
    token:string,
    message:string
}



export async function SendMessage(input:SenMessageInput):Promise<HTTPResponse<void>>{

    const url = VITE_BACKEND_URL+`/user/message/send`

    const headers = {
        authorization:input.token
    }

    const body = {
        message:input.message
    }

    const res = await Request.post({headers,url,body:body})

    if(res.error) return {status:res.status,error:res.error.error}
    
    return {status:200}


}