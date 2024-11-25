import axios from "axios";

export function delInfoAdProd(id, idSubDoc) {
    console.log("<<EJECUTA>> API <<delInfoAdProd>> Requiere:", id, idSubDoc)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.delete(`http://localhost:3020/api/v1/prod-serv/infoad/${id}/info_ad/${idSubDoc}`)
        .then((response) => {
          console.log("<<RESPONSE>> delInfoAdProd ", id, idSubDoc)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<delInfoAdProd>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<delInfoAdProd>>", error);
          reject(error); 
        });     
    });
 }