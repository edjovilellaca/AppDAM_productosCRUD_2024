import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
const ProductsTabs = ["PRODUCTOS", "ESTATUS", "PRESENTACIONES", "NEGOCIOS", "INFO_AD"];

//const ProductsNavTab = ({currentRowInProductsTab, setCurrentNameTabInPrincipalTab, setBusinessTabInPrincipalTabIsSelected}) => {

const ProductsNavTab = ({currentRowInProductsTab, setCurrentNameTabInPrincipalTab}) => {
    //FIC: para saber cual es el numero de Tab seleccionado.
    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    const handleChange = (e) => {
        
        //FIC: actualizar el nombre de la pestaña seleccionada.
        setCurrentNameTabInPrincipalTab(e.target.innerText.toUpperCase());

        //FIC: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "PRODUCTOS":
                setCurrentTabIndex(0);
                break;
            case "ESTATUS":
                setCurrentTabIndex(1);
                break;
            case "PRESENTACIONES":
                setCurrentTabIndex(2);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(3);
                break;
            case "INFO_AD":
                setCurrentTabIndex(4);
                break;
                                           
        }

    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {ProductsTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled ={currentRowInProductsTab === null}/>;
                })}
            </Tabs>
        </Box>
    );
};
export default ProductsNavTab;