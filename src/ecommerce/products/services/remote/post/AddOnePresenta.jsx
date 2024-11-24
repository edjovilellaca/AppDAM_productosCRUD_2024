import axios from "axios";

export function AddOnePresenta(prodKey, presenta) {
    console.log("<<EJECUTA>> API <<AddOnePresenta>> Requiere:", presenta)
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3020/api/v1/prod-serv/${prodKey}/presentaciones`, presenta)
        .then((response) => {
          console.log("<<RESPONSE>> AddOnePresenta", presenta)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePresenta>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOnePresenta>>", error);
          reject(error); 
        });     
    });
 }