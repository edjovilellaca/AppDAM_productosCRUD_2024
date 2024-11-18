import {  ProductModel } from "../models/productsModel";

export const ProductValues = (values)=>{
   let Product =  ProductModel()
   Product.IdProdServOK=values.IdProdServOK,
   Product.IdProdServPK=values.IdProdServOK,
   Product.IdProdServBK=values.IdProdServBK,
   Product.IdProdServMaOK=values.IdProdServMaOK,
   Product.DesProdServ=values.DesProdServ,
   Product.Alias=values.Alias,
   Product.Matriz=values.Matriz,
   Product.IdProdServMaBK=values.IdProdServMaBK
   return Product
}