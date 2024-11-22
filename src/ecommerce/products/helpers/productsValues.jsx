import {  ProductModel } from "../models/productsModel";

export const ProductValues = (values)=>{
   let Product =  ProductModel()
   Product.IdInstitutoOK=values.IdInstitutoOK,
   Product.IdProdServOK=values.IdProdServOK,
   Product.IdProdServBK=values.IdProdServBK,
   Product.CodigoBarras=values.CodigoBarras,
   Product.DesProdServ=values.DesProdServ,
   Product.Indice=values.Indice
   return Product
}