import axios from "axios";

export function GetEstatus(IdProdServOK, IdInstitutoOK) {
    return new Promise((resolve, reject) => {

        axios.get(`http://localhost:3020/api/v1/prod-serv/${IdProdServOK}`)
            .then((response) => {
                const data = response.data;

                if (data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_prod_serv>>");
                    resolve([]);
                } else {
                    //resolve(data.estatus); // Para el documentote asi bien gigante que tiene todo de todo, 4x4, motor 8v
                    resolve(data.cat_prod_serv_estatus);
                }
            })
            .catch((error) => {
                console.error("Error en <<GetEstatus - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}