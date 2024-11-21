import { getDetailRow } from "../helpers/Utils";
import mongoose from 'mongoose';

export function EstatusModel() {
    let Estatus = {
        IdTipoEstatusOK: { type: String },
        IdProdServOK: { type: String },
        IdProdServPK: { type: Number},
        Actual: { type: String },
        Observacion : { type : String },
    };
    return Estatus
};