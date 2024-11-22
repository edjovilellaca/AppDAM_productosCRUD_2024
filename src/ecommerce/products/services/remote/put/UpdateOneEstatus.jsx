import axios from "axios";

export function UpdateOneEstatus(status,estatus) {
    console.log("<<EJECUTA>> API <<UpdateOneEstatus>> Requiere:", estatus)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
        axios.post(`http://localhost:3020/api/v1/prod-serv/update/${status}/estatus`, estatus)
            .then((response) => {
            console.log("<<RESPONSE>> UpdateOneEstatus", estatus)
            const data = response.data;
            console.log('response data:');
            console.log(data);
            if (data.length === 0) {      
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneEstatus>> de forma correcta", data);
                reject(data); 
            } else {
                resolve(data);
            }
            })
            .catch((error) => {
            console.error("<<ERROR>> en API <<UpdateOneEstatus>>", error);
            reject(error); 
            });     
    });
 }