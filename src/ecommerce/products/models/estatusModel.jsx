import { getDetailRow } from "../helpers/Utils";
import mongoose from 'mongoose';

export function EstatusModel() {
    let Estatus = {
        IdTipoEstatusOK: { type: String },
        Actual: { type: String },
        Observacion : { type : String },
    };
    return Estatus
};