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
import {GetNegocios} from '../../services/remote/get/GetNegocios.jsx';
//FIC: Modals
//import AddNegociosModal from "../modals/AddNegociosModal";


//FIC: Table - FrontEnd.
const NegociosTable = ({datosSeleccionados}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddProductShowModal, setAddProductShowModal] = useState(false);

    async function fetchData() {
        try {

            if (datosSeleccionados.IdProdServOK === "0" || datosSeleccionados.IdInstitutoOK === "0") {
                setLoadingTable(false);
                return;
            }

            const OneProductData = await GetNegocios(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);
            setProductData(OneProductData);
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
            accessorKey: "IdNegocioOK",
            header: "IdNegocioOK",
            size: 30, //small column
        },
    ];

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={ProductsColumns}
                    data={ProductData}
                    state={{isLoading: loadingTable}}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    renderTopToolbarCustomActions={({table}) => (
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
                <AddNegociosModal
                    AddProductShowModal={AddProductShowModal}
                    setAddProductShowModal={setAddProductShowModal}
                    datosSeleccionados={datosSeleccionados}
                    onClose={() => setAddProductShowModal(false)}
                />
            </Dialog>*/}
        </Box>
    );
};

export default NegociosTable;