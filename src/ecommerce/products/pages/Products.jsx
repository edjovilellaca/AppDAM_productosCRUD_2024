import { Box } from "@mui/material";
import { useState } from "react";
import ProductsNavTab from "../components/tabs/productsNavTab";
import ProductsTab from "../components/tabs/productsTab";

const Products = () => {
    const [currentRowInProductsTab, setCurrentRowInProductsTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("PRODUCTOS");
    return (
        <Box>

            <ProductsNavTab
                setCurrentRowInProductsTab={setCurrentRowInProductsTab} 
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab} 
            />

            {currentTabInPrincipalTab == "PRODUCTOS" && <ProductsTab />}
        </Box>
    );
};

export default Products;