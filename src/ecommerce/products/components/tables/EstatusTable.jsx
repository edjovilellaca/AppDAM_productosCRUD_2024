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
import {GetEstatus} from '../../services/remote/get/GetEstatus.jsx';
//FIC: Modals
import AddEstatusModal from "../modals/AddEstatusModal";
import { delOneSubProduct } from "../../services/remote/del/delOneSubProduct.jsx";
import UpdateEstatusModal from "../modals/UpdateEstatusModal.jsx";


//FIC: Table - FrontEnd.
const EstatusTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductData, setProductData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddEstatusShowModal, setAddEstatusShowModal] = useState(false);
    const [UpdateEstatusShowModal, setUpdateEstatusShowModal] = useState(false);

    const [selectedEstatus, setSelectedEstatus] = useState(null);

    async function fetchData() {
        try {
            if (datosSeleccionados.IdProdServOK === "0") {
                setLoadingTable(false);
                return;
            }
            const OneProductData = await GetEstatus(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);

            setProductData(OneProductData);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener los productos en useEffect de EstatusTable:", error);
        }
    }

    const fetchDataa = async () => {
        setLoadingTable(true);
        try {
          if (datosSeleccionados.IdProdServOK === "0") {
              setLoadingTable(false);
              return;
          }
          
          const OneProductData = await GetEstatus(datosSeleccionados.IdProdServOK, datosSeleccionados.IdInstitutoOK);
          setProductData(OneProductData);
          setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        setLoadingTable(false);
      };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (table) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        if (selectedRows.length === 0) {
            alert("Selecciona una fila para editar.");
            return;
        }
        const estatus = selectedRows[0]?.original;
        setSelectedEstatus(estatus);
        setUpdateEstatusShowModal(true);
    };

    const handleDelClick = (table) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        if (selectedRows.length === 0) {
            alert("Selecciona una fila para borrar.");
            return;
        }
        const product = selectedRows[0]?.original;
        const IdTipoEstatusOK = product[Object.keys(product)[1]];
        
        console.log('producttable: ', selectedRows);
        delOneSubProduct(datosSeleccionados.IdProdServOK, IdTipoEstatusOK);
        fetchDataa();
      };

    //FIC: Columns Table Definition.
    const ProductsColumns = [
        {
            accessorKey: "IdTipoEstatusOK",
            header: "IdTipoEstatusOK",
            size: 30, //small column
        },
        {
            accessorKey: "Actual",
            header: "Actual",
            size: 30, //small column
        },
        {
            accessorKey: "Observacion",
            header: "Observacion",
            size: 50, //small column
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
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={({table}) => (
                        <>
                            {/* ------- ACTIONS TOOLBAR INIT ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                    <IconButton onClick={() => {setAddEstatusShowModal(true)}}>
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
            {/* M O D A L E S */} {/* AddEstatusShowModal setAddEstatusShowModal */}
            <Dialog open={AddEstatusShowModal} onClose={() => setAddEstatusShowModal(false)}>
              <AddEstatusModal
                  AddEstatusShowModal={AddEstatusShowModal}
                  prodKey={datosSeleccionados.IdProdServOK}
                  setAddEstatusShowModal={setAddEstatusShowModal}
                  onEstatusAdded={fetchData}/>
          </Dialog>

          <Dialog open={UpdateEstatusShowModal} onClose={() => setUpdateEstatusShowModal(false)}>
              <UpdateEstatusModal
                  UpdateEstatusShowModal={UpdateEstatusShowModal}
                  setUpdateEstatusShowModal={setUpdateEstatusShowModal}
                  estatusData={selectedEstatus}
                  onEstatusUpdated={fetchData}
                  prodKey={datosSeleccionados.IdProdServOK}/>
          </Dialog>

        </Box>
    );
};

export default EstatusTable;