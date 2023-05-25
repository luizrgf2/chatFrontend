import { Request } from "../../../services/request"

interface ImageDownloadInterface{
    url:string
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
  
      reader.onerror = () => {
        reject(new Error('Erro ao converter Blob para Base64'));
      };
  
      reader.readAsDataURL(blob);
    });
  }
  

export async  function ImageDownload({url}:ImageDownloadInterface){

    const headers = {
      "accept": 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      'sec-fetch-dest': 'image',
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-site': 'cross-site',
      'origin':'https://google.com'

    }
    const res = await Request.get({headers:headers,url:url,responseType:"blob"})

    
    if(res.error) return ""
    const image = await blobToBase64(res.body)
    return image

}