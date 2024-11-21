import { Box } from "@mui/material";
import { useState } from "react";
import ProductsNavTab from "../components/tabs/productsNavTab";
import ProductsTable from "../components/tables/ProductsTables.jsx";
import PresentaTab from "../components/tabs/PresentaTab.jsx";
import EstatusTable from "../components/tables/EstatusTable.jsx";
import InfoAdTable from "../components/tables/InfoAdTable.jsx";

const Products = () => {
    const [currentRowInProductsTab, setCurrentRowInProductsTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("PRODUCTOS");
    const [datosSeleccionados, setDatosSeleccionados] = useState({IdInstitutoOK: "0", IdProdServOK: "0"});

    return (
        <Box>

            <ProductsNavTab
                setCurrentRowInProductsTab={setCurrentRowInProductsTab} 
                setCurrentNameTabInPrincipalTab={setCurrentTabInPrincipalTab} 
            />

            {currentTabInPrincipalTab == "PRODUCTOS" && 
                <ProductsTable setDatosSeleccionados={setDatosSeleccionados} datosSeleccionados={datosSeleccionados}/>}

            {/* Página de negocios */}
            {currentTabInPrincipalTab === "ESTATUS" && <EstatusTable setDatosSeleccionados={setDatosSeleccionados} datosSeleccionados={datosSeleccionados}/>}

            {/*Pagina de presenta*/}
            {currentTabInPrincipalTab === "PRESENTACIONES" && <PresentaTab datosSeleccionados={datosSeleccionados}/>}

            {/*Página de Información adicional*/}
            {currentTabInPrincipalTab === "INFO_AD" &&
                <InfoAdTable datosSeleccionados={datosSeleccionados}/>}

        </Box>
    );
};

export default Products;