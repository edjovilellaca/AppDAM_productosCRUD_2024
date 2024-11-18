import axios from "axios";

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3020/api/v1/prod-serv/getProductos`)
      .then((response) => {
        //console.log('response completa: ', response);
        const data = response.data;
        
        if (data.length === 0) {
          console.info("🛈 No se encontraron documentos en <<products>>");
          resolve([]);
        } else {
          resolve(data); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllProducts - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
