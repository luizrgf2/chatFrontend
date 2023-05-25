import "./style.scss"


export interface MessageInterface{
    type:"user"|"self",
    message:string,
    userName:string,
    photoUrl:string
}

export function MessageComponent({type,message,userName}:MessageInterface){



    return(

        <div
            className={"messageComponent "+type}
        >
            <div>
                <h4>{userName}</h4>
            </div>

            <p>{message.split("\n")}</p>

        </div>


    )
}