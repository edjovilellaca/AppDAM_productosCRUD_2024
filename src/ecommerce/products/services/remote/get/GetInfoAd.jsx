import axios from "axios";

export function GetInfoAd(IdProdServOK, IdInstitutoOK) {
    return new Promise((resolve, reject) => {

        axios.get(`http://localhost:3020/api/v1/prod-serv/${IdProdServOK}`)
            .then((response) => {
                const data = response.data;

                if (data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_prod_serv>>");
                    resolve([]);
                } else{
                    console.log("informacion: "+data.info_ad);
                    resolve(data.info_ad); // Resuelve la promesa y hace una copia profunda
                }
            })
            .catch((error) => {
                console.error("Error en <<GetInfoAd - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}