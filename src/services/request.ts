import axios from "axios";


export interface HTTPRequest<T=any>{
    body?:T
    url:string,
    headers:object,
    responseType?:"blob"
}

export interface HTTPResponse<T=any>{
    body?:T,
    error?:any
    status:number
}

export class Request{

    static async get({headers,url,responseType}:Omit<HTTPRequest,"body">):Promise<HTTPResponse>{
        try{
            const res = await axios.get(url,{headers:headers, responseType:responseType})
            return {
                status:res.status,
                body:res.data,
            }
        }catch(e:any){
            if(e.response){
                const response = responseType === "blob" ? JSON.parse(await e.response.data.text()) : e.response.data

                return{
                    status:e.response.status,
                    error:response
                }
            }else{
                return{
                    status:500,
                    error:"Erro no servidor!"
                }
            }
        }
    }

    static async post({headers,url,body,responseType}:HTTPRequest):Promise<HTTPResponse>{
        try{
            const res = await axios.post(url,body,{headers:headers, responseType:responseType})
            return {
                status:res.status,
                body:res.data
            }
        }catch(e:any){
            
            if(e.response){

                const response = responseType === "blob" ? JSON.parse(await e.response.data.text()) : e.response.data

                return{
                    status:e.response.status,
                    error:response
                }
            }else{
                return{
                    status:500,
                    error:"Erro no servidor!"
                }
            }
        }
    }

    static async put({headers,url,body,responseType}:HTTPRequest):Promise<HTTPResponse>{
        try{
            const res = await axios.post(url,body,{headers:headers, responseType:responseType})
            return {
                status:res.status,
                body:res.data
            }
        }catch(e:any){
            if(e.response){


                const response = responseType === "blob" ? JSON.parse(await e.response.data.text()) : e.response.data

                return{
                    status:e.response.status,
                    error:response
                }
            }else{
                return{
                    status:500,
                    error:"Erro no servidor!"
                }
            }
        }
    }

    static async delete({headers,url,responseType}:Omit<HTTPRequest,"body">):Promise<HTTPResponse>{
        try{
            const res = await axios.delete(url,{headers:headers, responseType:responseType})
            return {
                status:res.status,
                body:res.data
            }
        }catch(e:any){
            if(e.response){
                const response = responseType === "blob" ? JSON.parse(await e.response.data.text()) : e.response.data

                return{
                    status:e.response.status,
                    error:response
                }
            }else{
                return{
                    status:500,
                    error:"Erro no servidor!"
                }
            }
        }
    }
}