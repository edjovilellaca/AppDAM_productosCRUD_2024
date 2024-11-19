import {Box} from "@mui/material";
import {useState} from "react";
//FIC:
import PresentaNavTab from "./PresentaNavTab.jsx";
import PresentaTable from "../tables/PresentaTable.jsx";
import PresentaInfoVTATable from "../tables/PresentaInfoVTATable.jsx";
import PresentaInfoAdTable from "../tables/PresentaInfoAdTable.jsx";
import PresentaPaquete from "../tables/PresentaPaquete.jsx";
import PresentaArchivosTable from "../tables/PresentaArchivosTable.jsx";

export default function PresentaTab({datosSeleccionados}) {

    //FIC: indicamos que al iniciar no hay ningun Producto seleccionado.
    const [currentRowInPresentaTab, setCurrentRowInPresentaTab] = useState(1);

    //FIC: indicamos que el estado inicial del tab page principal por default sera la de NEGOCIOS.
    const [currentNameTabInPresentaTab, setCurrentNameTabInPresentaTab] = useState("PRESENTA");

    const [datosSecSubdocumentoPresenta, setDatosSecSubdocumentoPresenta] = useState({
        IdPresentaOK: "0",
        IdPresentaBK: "0"
    });

    return (
        <Box>
            <PresentaNavTab
                currentRowInPresentaTab={currentRowInPresentaTab}
                setCurrentNameTabInPresentaTab={setCurrentNameTabInPresentaTab}
            />

            {console.log(currentNameTabInPresentaTab)}

            {currentNameTabInPresentaTab == "PRESENTA" && <PresentaTable datosSeleccionados={datosSeleccionados}
                                                                         setDatosSecSubdocumentoPresenta={setDatosSecSubdocumentoPresenta}/>}
            {currentNameTabInPresentaTab == "INFO_VTA" && <PresentaInfoVTATable datosSeleccionados={datosSeleccionados}
                                                                                datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}/>}
            {currentNameTabInPresentaTab == "INFO_AD" && <PresentaInfoAdTable datosSeleccionados={datosSeleccionados}
                                                                              datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}/>}
            {currentNameTabInPresentaTab == "PAQUETE" && <PresentaPaquete datosSeleccionados={datosSeleccionados}
                                                                              datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}/>}                                                                  
            {currentNameTabInPresentaTab == "ARCHIVOS" && <PresentaArchivosTable datosSeleccionados={datosSeleccionados}
                                                                                 datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}/>}

        </Box>
    );
}