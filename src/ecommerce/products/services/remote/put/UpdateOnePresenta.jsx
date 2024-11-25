import axios from "axios";

export function UpdateOnePresenta(prodKey, pDataId, PresentaData) {
    console.log("<<EJECUTA>> API <<UpdateOnePresenta>> ID pDataId: ", pDataId, " Requiere:", PresentaData)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
        axios.put(`http://localhost:3020/api/v1/prod-serv/updateInfoAd/${prodKey}/presentaciones/${pDataId}`, PresentaData)
            .then((response) => {
            console.log("<<RESPONSE>> UpdateOnePresenta", PresentaData)
            const data = response.data;
            console.log('response data:');
            console.log(data);
            if (data.length === 0) {      
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOnePresenta>> de forma correcta", data);
                reject(data); 
            } else {
                resolve(data);
            }
            })
            .catch((error) => {
            console.error("<<ERROR>> en API <<UpdateOnePresenta>>", error);
            reject(error); 
            });     
    });
 }