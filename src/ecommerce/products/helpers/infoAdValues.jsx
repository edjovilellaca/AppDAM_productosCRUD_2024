import {  InfoAdModel } from "../models/infoAdModel";

export const InfoAdValues = (values)=>{
   let InfoAd =  InfoAdModel()
   InfoAd.IdEtiquetaOK=values.IdEtiquetaOK,
   InfoAd.IdEtiqueta=values.IdEtiqueta,
   InfoAd.Valor=values.Valor,
   InfoAd.IdTipoSeccionOK=values.IdTipoSeccionOK,
   InfoAd.Secuencia=values.Secuencia
   return InfoAd
}