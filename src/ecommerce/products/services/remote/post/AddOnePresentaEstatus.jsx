import axios from "axios";

export function AddOnePresentaEstatus(prodKey, presentaKey, estatus) {
    
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3020/api/v1/prod-serv/${prodKey}/${presentaKey}/estatus`, estatus)
        .then((response) => {
          console.log("<<RESPONSE>> AddOnePresentaEstatus", response)
          const { status, message, data } = response;
          if ( status != 200 ) {      
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