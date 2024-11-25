import axios from "axios";

export function AddOnePresentaEstatus(prodKey, presentaKey, estatus) {
    
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3020/api/v1/prod-serv/${prodKey}/${presentaKey}/estatus`, estatus)
        .then((response) => {
          console.log("<<RESPONSE>> AddOnePresentaEstatus", estatus)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePresentaEstatus>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOnePresentaEstatus>>", error);
          reject(error); 
        });     
    });
 }