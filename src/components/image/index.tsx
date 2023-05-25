import { useEffect, useState } from "react"
import { ImageDownload } from "./rules/donwloadImage"

export function Img(props:React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>){


    const [imageUrl,setImageUrl] = useState("")

    async function handleImageDownload(){
        const image = await ImageDownload({url:props.src||""})
        setImageUrl(image)
    }

    useEffect(()=>{
        handleImageDownload()
    },[])


    return <img {...props} src={imageUrl}></img>

}