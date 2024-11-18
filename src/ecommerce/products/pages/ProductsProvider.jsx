import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllProducts } from "../../../services/get";
import { esperar } from "../../products/helpers/Utils";
//FIC: Crear un contexto para compartir datos y funciones, y un componente que contendrá todos los estados y funciones
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productSel, setProductSel] = useState(null);
  const [presentationSel, setPresentationSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
  const [idSelectedRowPresentation, setIdSelectedRowPresentation] =
    useState(null);
  const showToastExito = () => console.log('EXITO');
  useEffect(() => {
    fetchDataProducts();
  }, []);
  const fetchDataProducts = async (id) => {
    setLoadingTable(true);
    await esperar(500);
    try {
      setProducts(await getAllProducts());
    } catch (error) {
      console.error(`Error al obtener los productos`, error);
    }
    setLoadingTable(false);
  };
  const fetchDataProductSelect = async (id) => {
    setLoadingTable(true);
    await esperar(500);
    try {
      setProductSel(await getProduct(id));
    } catch (error) {
      console.error(`Error al obtener producto:${id}`, error);
    }
    setLoadingTable(false);
  };
  const fetchPresentationSelect = async (id) => {
    setLoadingTable(true);
    try {
      let productoSel = await getProduct(id);
      let presentaciones = productoSel.cat_prod_serv_presenta;
      let presentacion = presentaciones.find((p) => {
        return p.IdPresentaOK === presentationSel.IdPresentaOK;
      });
      setPresentationSel(presentacion);
    } catch (error) {
      console.error(
        `Error al obtener la presentacion del producto ${id}`,
        error
      );
    }
    setLoadingTable(false);
  };
  //FIC: Pasar los datos y funciones a través del contexto
  const contextValue = {
    products,
    productSel,
    loadingTable,
    idSelectedRowProduct,
    idSelectedRowPresentation,
    presentationSel,
    setProductSel,
    fetchDataProducts,
    fetchDataProductSelect,
    showToastExito,
    setIdSelectedRowProduct,
    setIdSelectedRowPresentation,
    setPresentationSel,
    fetchPresentationSelect,
  };
  return (
    <ProductsContext.Provider value={contextValue}>
      {children} <ToastContainer />
    </ProductsContext.Provider>
  );
};
//FIC: Crear un hook personalizado para acceder al contexto
export const useProductsContext = () => useContext(ProductsContext);