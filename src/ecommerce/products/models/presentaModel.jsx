import { getDetailRow } from "../helpers/Utils";

export function PresentaModel() {
    let Presenta = {
        IdPresentaOK: { type: String },
        IdPresentaBK: { type: String },
        CodigoBarras: { type : String },
        DesPresenta: { type : String },
        Indice: { type : String },
        Principal: { type : String }
    };
    return Presenta
};