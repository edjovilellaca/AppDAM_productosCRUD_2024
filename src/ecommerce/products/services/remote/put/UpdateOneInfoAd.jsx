import axios from "axios";

export function UpdateOneInfoAd(prodKey, InfoAd, infoAdId) {
    console.log("<<EJECUTA>> API <<UpdateOneInfoAd>> Requiere:", InfoAd)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
        axios.put(`http://localhost:3020/api/v1/prod-serv/updateInfoAd/${prodKey}/info_ad/${infoAdId}`, InfoAd)
            .then((response) => {
            console.log("<<RESPONSE>> UpdateOneInfoAd", InfoAd, infoAdId)
            const data = response.data;
            console.log('response data:');
            console.log(data);
            if (data.length === 0) {      
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneInfoAd>> de forma correcta", data);
                reject(data); 
            } else {
                resolve(data);
            }
            })
            .catch((error) => {
            console.error("<<ERROR>> en API <<UpdateOneInfoAd>>", error);
            reject(error); 
            });     
    });
 }