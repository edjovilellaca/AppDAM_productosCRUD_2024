import {  EstatusModel } from "../models/estatusModel";

export const EstatusValues = (values)=>{
   console.log('Valores: ', values);
   let Estatus =  EstatusModel()
   Estatus.IdProdServOK=values.IdProdServOK,
   Estatus.IdProdServPK=values.IdProdServOK,
   Estatus.IdTipoEstatusOK=values.IdTipoEstatusOK,
   Estatus.Actual=values.Actual,
   Estatus.Observacion=values.Observacion
   return Estatus
}