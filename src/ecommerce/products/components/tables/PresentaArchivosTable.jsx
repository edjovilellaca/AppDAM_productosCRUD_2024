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
//import AddPresentaArchivos from "../modals/AddPresentaArchivos.jsx";
//import AddPresentaArchivosDetailsModal from "../modals/detailsModals/AddPresentaArchivosDetailsModal.jsx";


function getDatosFiltrados(OneProductData, datosSecSubdocumentoPresenta) {
    const resultadoFiltrado = OneProductData.filter(elemento => (
        elemento.IdPresentaOK === datosSecSubdocumentoPresenta.IdPresentaOK 
    ));

    // Obtener cat_prod_serv_info_vta del primer elemento filtrado (si existe)
    return resultadoFiltrado.length > 0
        ? resultadoFiltrado[0].archivos
        : null;
}

//FIC: Table - FrontEnd.
const PresentaArchivosTable = ({datosSeleccionados, datosSecSubdocumentoPresenta}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddProductShowModal, setAddProductShowModal] = useState(false);

    // Controlar el esto de muestra u oculta la modal para ver los detalles de un producto
    const [AddProductDetailsShowModal, setAddProductDetailsShowModal] = useState(false);

    // Controlar el estado de los datos del subdocumento de archivos
    const [datosSubDocArchivos, setDatosSubDocArchivos] = useState([]);

    async function fetchData() {
        try {

            if (datosSecSubdocumentoPresenta.IdPresentaOK === "0" || datosSeleccionados.IdPresentaBK === "0") {
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
            accessorKey: "IdArchivoOK",
            header: "IdArchivoOK",
            size: 30, //small column
        },
        {
            accessorKey: "IdArchivoBK",
            header: "IdArchivoBK",
            size: 30, //small column
        },
        {
            accessorKey: "DesArchivo",
            header: "DesArchivo",
            size: 30, //small column
        },
        {
            accessorKey: "RutaArchivo",
            header: "RutaArchivo",
            size: 30, //small column
            maxSize: 30,
        },
        {
            accessorKey: "Path",
            header: "Path",
            size: 30, //small column
            maxSize: 10,
        },
        {
            accessorKey: "IdTipoArchivoOK",
            header: "IdTipoArchivoOK",
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
        },
        {
            accessorKey: "Principal",
            header: "Principal",
            size: 30, //small column
        }
    ];

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Actualizar el estado de los datos seleccionados
        setDatosSubDocArchivos(rowData.original);
    };

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={ProductsColumns}
                    data={ProductData}
                    state={{isLoading: loadingTable}}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    /*setDatosSubDocArchivos*/
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
                <AddPresentaArchivos
                    AddProductShowModal={AddProductShowModal}
                    setAddProductShowModal={setAddProductShowModal}
                    datosSeleccionados={datosSeleccionados}
                    datosSecSubdocumentoPresenta={datosSecSubdocumentoPresenta}
                    onClose={() => setAddProductShowModal(false)}
                />
            </Dialog>
            <Dialog open={AddProductDetailsShowModal}>
                <AddPresentaArchivosDetailsModal
                    AddProductDetailsShowModal={AddProductDetailsShowModal}
                    setAddProductDetailsShowModal={setAddProductDetailsShowModal}
                    datosSubDocArchivos={datosSubDocArchivos}
                    onClose={() => setAddProductDetailsShowModal(false)}
                />
            </Dialog>*/}
        </Box>
    );
};

export default PresentaArchivosTable;