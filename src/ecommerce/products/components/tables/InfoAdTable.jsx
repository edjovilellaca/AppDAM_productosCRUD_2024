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
import {GetInfoAd} from '../../services/remote/get/GetInfoAd.jsx';
import { delInfoAdProd } from "../../services/remote/del/delOneSubInfoAd.jsx";
//FIC: Modals
import AddInfoAdModal from "../modals/AddInfoAdModal.jsx";
import UpdateInfoAdModal from "../modals/UpdateInfoAdModal.jsx";

//FIC: Table - FrontEnd.
const InfoAdTable = ({datosSeleccionados}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);
    const [selectedProductInfoAd, setselectedProductInfoAd] = useState(null);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddInfoAdShowModal, setAddInfoAdShowModal] = useState(false);
    const [UpdateInfoAdShowModal, setUpdateInfoAdShowModal] = useState(false);

    const fetchData = async () => {
        try {

            if (datosSeleccionados.IdProdServOK === "0" || datosSeleccionados.IdInstitutoOK === "0") {
                setLoadingTable(false);
                return;
            }

            const OneProductData = await GetInfoAd(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);
            setProductData([...OneProductData]);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la información adicional en useEffect de InfoAdTable:", error);
        }
    }

    const handleEditClick = (table) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        if (selectedRows.length === 0) {
            alert("Selecciona una fila para editar.");
            return;
        }
        const product = selectedRows[0]?.original;
        setselectedProductInfoAd(product);
        setUpdateInfoAdShowModal(true);
      };

    const handleDelClick = async (table) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        if (selectedRows.length === 0) {
            alert("Selecciona una fila para borrar.");
            return;
        }
        const product = selectedRows[0]?.original;
        const infoAdId = product[Object.keys(product)[5]];
        
        console.log('producto id obj infoad: ', infoAdId);
        await delInfoAdProd(datosSeleccionados.IdProdServOK, infoAdId);
        await fetchData();
      };


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
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    state={{isLoading: loadingTable}}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    renderTopToolbarCustomActions={({table}) => (
                        <>
                            {/* ------- ACTIONS TOOLBAR INIT ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                    <IconButton onClick={() => setAddInfoAdShowModal(true)}>
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
            {/* M O D A L E S */}
            <Dialog open={AddInfoAdShowModal}>
                <AddInfoAdModal
                    AddInfoAdShowModal={AddInfoAdShowModal}
                    setAddInfoAdShowModal={setAddInfoAdShowModal}
                    prodKey={datosSeleccionados.IdProdServOK}
                    onInfoAddAdded={fetchData}
                    onClose={() => setAddInfoAdShowModal(false)}
                />
            </Dialog>

            <Dialog open={UpdateInfoAdShowModal}>
                <UpdateInfoAdModal
                    UpdateInfoAdShowModal={UpdateInfoAdShowModal}
                    setUpdateInfoAdShowModal={setUpdateInfoAdShowModal}
                    prodKey={datosSeleccionados.IdProdServOK}
                    InfoAdData={selectedProductInfoAd}
                    onInfoAdUpdated={fetchData}
                    onClose={() => setUpdateInfoAdShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};

export default InfoAdTable;