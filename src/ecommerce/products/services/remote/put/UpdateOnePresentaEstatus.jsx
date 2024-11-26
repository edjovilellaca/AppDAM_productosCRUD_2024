import axios from "axios";

export function UpdateOnePresentaEstatus(prodKey, presentaKey, campoId, estatus) {
    console.log("<<EJECUTA>> API <<UpdateOnePresentaEstatus>> ID pDataId:  Requiere:")
    return new Promise((resolve, reject) => {

        axios.put(`http://localhost:3020/api/v1/prod-serv/${prodKey}/${presentaKey}/${campoId}/estatus`, estatus)
            .then((response) => {
            console.log("<<RESPONSE>> UpdateOnePresentaEstatus", response)
            const data = response.data;
            console.log('response data:');
            console.log(data);
            if (data.length === 0) {      
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOnePresentaEstatus>> de forma correcta", data);
                reject(data); 
            } else {
                resolve(data);
            }
            })
            .catch((error) => {
            console.error("<<ERROR>> en API <<UpdateOnePresentaEstatus>>", error);
            reject(error); 
            });     
    });
 }