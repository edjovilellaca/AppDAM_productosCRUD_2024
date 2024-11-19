//FIC: React
import React, {useEffect, useState} from "react";
//FIC: Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, Button, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from '@mui/icons-material/Publish';
import RefreshIcon from '@mui/icons-material/Refresh';
//FIC: DB
import {GetPresenta} from "../../services/remote/get/GetPresenta.jsx";
//FIC: Modals
//import AddPresentaInfoAdModal from "../modals/AddPresentaInfoAdModa.jsx";


function getDatosFiltrados(OneProductData, datosSecSubdocumentoPresenta) {
    const resultadoFiltrado = OneProductData.filter(elemento => (
        elemento.IdPresentaOK === datosSecSubdocumentoPresenta.IdPresentaOK 
    ));

    // Obtener cat_prod_serv_info_vta del primer elemento filtrado (si existe)
    return resultadoFiltrado.length > 0
        ? resultadoFiltrado[0].info_ad
        : null;
}

//FIC: Table - FrontEnd.
const PresentaInfoAdTable = ({datosSeleccionados, datosSecSubdocumentoPresenta}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddProductShowModal, setAddProductShowModal] = useState(false);

    async function fetchData() {
        try {

            if (datosSecSubdocumentoPresenta.IdPresentaOK === "0" || datosSecSubdocumentoPresenta.IdPresentaBK === "0") {
                setLoadingTable(false);
                return;
            }

            const OneProductData = await GetPresenta(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);

            const datosFiltrados = getDatosFiltrados(OneProductData, datosSecSubdocumentoPresenta);

            setProductData(datosFiltrados);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener los productos en useEffect de EstatusTable:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //FIC: Columns Table Definition.
    const ProductsColumns = [
        {
            accessorKey: "IdEtiquetaOK",
            header: "IdEtiquetaOK",
            size: 30, //small column
        },
        {
            accessorKey: "IdEtiqueta",
            header: "IdEtiqueta",
            size: 30, //small column
        },
        {
            accessorKey: "Valor",
            header: "Valor",
            size: 30, //small column
        },
        {
            accessorKey: "IdTipoSeccionOK",
            header: "IdTipoSeccionOK",
            size: 30, //small column
        },
        {
            accessorKey: "Secuencia",
            header: "Secuencia",
            size: 30, //small column
        }
    ];

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={ProductsColumns}
                    data={ProductData}
                    state={{isLoading: loadingTable}}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- ACTIONS TOOLBAR INIT ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                    <IconButton onClick={() => setAddProductShowModal(true)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                    <IconButton onClick={() => handleEditClick(table)}>
                                        <EditIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar" onClick={() => handleDelClick(table)}>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- ACTIONS TOOLBAR END ------ */}
                        </>
                    )}
                />
            </Box>
            {/* M O D A L E S 
            <Dialog open={AddProductShowModal}>
                <AddPresentaInfoAdModal
                    AddProductShowModal={AddProductShowModal}
                    setAddProductShowModal={setAddProductShowModal}
                    datosSeleccionados={datosSeleccionados}
                    datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}
                    onClose={() => setAddProductShowModal(false)}
                />
            </Dialog>*/}
        </Box>
    );
};

export default PresentaInfoAdTable;