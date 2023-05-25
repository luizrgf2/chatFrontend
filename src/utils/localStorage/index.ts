export class LocalStorage{

    static setAccessTokenGoogle(value:string){
        localStorage.setItem("accessTokenGoogle",value)
    }

    static setToken(value:string){
        localStorage.setItem("token",value)
    }

    static getToken(){
        const value = localStorage.getItem("token")
        return value === null ? undefined : value
    }

    static removeToken(){
        localStorage.removeItem("token")
    }

    static getAccessTokenGoogle(){
        const value = localStorage.getItem("accessTokenGoogle")
        return value === null ? undefined : value
    }

    static setRequestType(value:"register"|"login"){
        localStorage.setItem("reqType",value)
    }

    static getRequestType(){
        const value = localStorage.getItem("reqType")
        return value === null ? undefined : value as "register"|"login"
    }
}
