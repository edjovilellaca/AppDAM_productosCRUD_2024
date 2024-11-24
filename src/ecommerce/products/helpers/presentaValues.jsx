import {  PresentaModel } from "../models/presentaModel";

export const PresentaValues = (values)=>{
   let Presenta =  PresentaModel()
   Presenta.IdPresentaOK=values.IdPresentaOK,
   Presenta.IdPresentaBK=values.IdPresentaBK,
   Presenta.CodigoBarras=values.CodigoBarras,
   Presenta.DesPresenta=values.DesPresenta,
   Presenta.Principal=values.Principal,
   Presenta.Indice=values.Indice
   return Presenta
}