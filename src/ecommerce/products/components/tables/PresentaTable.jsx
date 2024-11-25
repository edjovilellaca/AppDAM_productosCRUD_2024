//FIC: React
import React, {useEffect, useState} from "react";
//FIC: Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, Button, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
import {GetPresenta} from '../../services/remote/get/GetPresenta.jsx';
import { delOneSubProduct } from "../../services/remote/del/delOneSubProduct.jsx";
//FIC: Modals
import AddPresentaModal from "../modals/AddPresentaModal.jsx";
import UpdatePresentaModal from "../modals/UpdatePresentaModal.jsx";


//FIC: Table - FrontEnd.
const PresentaTable = ({datosSeleccionados, setDatosSecSubdocumentoPresenta}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Presenta.
    const [AddPresentaShowModal, setAddPresentaShowModal] = useState(false);
    const [UpdatePresentaShowModal, setUpdatePresentaShowModal] = useState(false);

    const [selectedPresenta, setSelectedPresenta] = useState(null);

    const fetchData = async () => {
        try {

            if (datosSeleccionados.IdProdServOK === "0" || datosSeleccionados.IdInstitutoOK === "0") {
                setLoadingTable(false);
                return;
            }

            const OneProductData = await GetPresenta(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);
            setProductData([...OneProductData]);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener los productos en useEffect de PresentaTable:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelClick = async (table) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        if (selectedRows.length === 0) {
            alert("Selecciona una fila para borrar.");
            return;
        }
        const product = selectedRows[0]?.original;
        const presentaOK = product[Object.keys(product)[0]];
  
        console.log('presentaOK: ', presentaOK);
        await delOneSubProduct(datosSeleccionados.IdProdServOK, presentaOK, 'presentaciones');
        await fetchData();
      };

    const sendDataRow = (rowData) => {
        // Accede a los datos necesarios del registro (rowData) y llama a tu método
        const {IdPresentaOK, IdPresentaBK} = rowData.original;
        // Mostrar en consola los datos del registro
        console.log("IdPresentaOK: ", IdPresentaOK);
        console.log("IdPresentaBK: ", IdPresentaBK);
        // Actualizar el estado de los datos seleccionados
        setSelectedPresenta(rowData.original);
        setDatosSecSubdocumentoPresenta({IdPresentaOK, IdPresentaBK});
    };

    //FIC: Columns Table Definition.
    const ProductsColumns = [
        {
            accessorKey: "IdPresentaOK",
            header: "IdPresentaOK",
            size: 30, //small column
        },
        {
            accessorKey: "IdPresentaBK",
            header: "IdPresentaBK",
            size: 30, //small column
        },
        {
            accessorKey: "CodigoBarras",
            header: "CodigoBarras",
            size: 30, //small column
        },
        {
            accessorKey: "DesPresenta",
            header: "DesPresenta",
            size: 30, //small column
        },
        {
            accessorKey: "Indice",
            header: "Indice",
            size: 30, //small column
        },
        {
            accessorKey: "Principal",
            header: "Principal",
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
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={({table}) => (
                        <>
                            {/* ------- ACTIONS TOOLBAR INIT ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                    <IconButton onClick={() => setAddPresentaShowModal(true)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                    <IconButton onClick={() => setUpdatePresentaShowModal(true)}>
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
            <Dialog open={AddPresentaShowModal} onClose={() => setAddPresentaShowModal(false)}>
                <AddPresentaModal
                    AddPresentaShowModal={AddPresentaShowModal}
                    setAddPresentaShowModal={setAddPresentaShowModal}
                    prodKey={datosSeleccionados.IdProdServOK}
                    prodBK={datosSeleccionados.IdProdServBK}
                    onPresentaAdded={fetchData}/>
            </Dialog>

            <Dialog open={UpdatePresentaShowModal} onClose={() => setUpdatePresentaShowModal(false)}>
              <UpdatePresentaModal
                  UpdatePresentaShowModal={UpdatePresentaShowModal}
                  setUpdatePresentaShowModal={setUpdatePresentaShowModal}
                  presentaData={selectedPresenta}
                  prodKey={datosSeleccionados.IdProdServOK}
                  prodDocKey={datosSeleccionados._id}
                  onPresentaUpdated={fetchData}/>
            </Dialog>
        </Box>
    );
};

export default PresentaTable;