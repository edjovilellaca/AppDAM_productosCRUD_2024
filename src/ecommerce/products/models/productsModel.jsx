import { getDetailRow } from "../helpers/Utils";

export function ProductModel() {
    let ProdServ = {
        IdProdServOK: { type: String },
        IdProdServBK: { type: String },
        IdProdServMaOK : { type : String },
        DesProdServ: { type: String },
        Alias: { type: String },
        Matriz: { type: String },
        IdProdServMaBK: { type: String },
        cat_negocios: [],
        detail_row: getDetailRow(),
    };
    return ProdServ
};