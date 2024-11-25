import axios from "axios";

export function delOneSubProduct(id, idSubDoc, nombreSub) {
    console.log("<<EJECUTA>> API <<delOneSubProduct>> Requiere:", id, idSubDoc)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.delete(`http://localhost:3020/api/v1/prod-serv/${id}/${nombreSub}/${idSubDoc}`)
        .then((response) => {
          console.log("<<RESPONSE>> delOneSubProduct ", id, idSubDoc)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<delOneSubProduct>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<delOneSubProduct>>", error);
          reject(error); 
        });     
    });
 }