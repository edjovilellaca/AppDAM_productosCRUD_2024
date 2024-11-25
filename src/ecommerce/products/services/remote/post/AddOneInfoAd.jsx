import axios from "axios";

export function AddOneInfoAd(prodKey, infoAd) {
    console.log("<<EJECUTA>> API <<AddOneInfoAd>> Requiere:", infoAd)
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3020/api/v1/prod-serv/${prodKey}/info_ad`, infoAd)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneInfoAd", infoAd)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInfoAd>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneInfoAd>>", error);
          reject(error); 
        });     
    });
 }