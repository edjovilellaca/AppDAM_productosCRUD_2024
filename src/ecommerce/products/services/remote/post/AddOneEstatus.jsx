import axios from "axios";

export function AddOneEstatus(status,prodKey) {
    console.log("<<EJECUTA>> API <<AddOneEstatus>> Requiere:", status)
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3020/api/v1/prod-serv/${prodKey}/cat_prod_serv_estatus`, status)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneEstatus", status)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneEstatus>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneEstatus>>", error);
          reject(error); 
        });     
    });
 }