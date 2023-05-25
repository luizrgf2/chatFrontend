import { VITE_BACKEND_URL } from "../../../../config"
import { HTTPResponse, Request } from "../../../../services/request"

export interface registerUserWithGoogleInput{
    accessToken:string
}

export interface registerUserWithGoogleOutput{
    user: {
		id: string,
		createdAt: Date,
		updatedAt: Date,
		name: string,
		email: string,
		pictureUrl: string
    }
}

export async function registerUserWithGoogle(input:registerUserWithGoogleInput):Promise<HTTPResponse<registerUserWithGoogleOutput>>{

    const url = VITE_BACKEND_URL+`/user/register`

    const res = await Request.post({headers:{},url,body:input})

    
    if(res.error) return {status:res.status,error:res.error.error}
    
    const data:registerUserWithGoogleOutput = {
        user:
            {
                ...res.body.user,
                createdAt:new Date(res.body.user.createdAt),
                updatedAt:new Date(res.body.user.updatedAt)
            }
    }

    return {body:data,status:res.status}
}