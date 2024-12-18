import { MaterialReactTable } from 'material-react-table';
import React from "react";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

import { getAllProducts } from '../../services/remote/get/getAllProducts';
import AddProductModal from "../modals/AddProductModal";
import UpdateProductModal from '../modals/UpdateProductModal';
import { delOneProduct } from '../../services/remote/del/delOneProduct';

const ProdServColumns = [
    {
        accessorKey: "IdInstitutoOK",
        header: "ID INSTITUTO OK",
        size: 30 // small column
    },
    {
        accessorKey: "IdProdServOK",
        header: "ID PRODSERV OK",
        size: 30 // small column
    },
    {
        accessorKey: "IdProdServBK",
        header: "ID PRODSERV BK",
        size: 30 // small column
    },
    {
        accessorKey: "CodigoBarras",
        header: "CÓDIGO DE BARRAS",
        size: 50 // small column
    },
    {
        accessorKey: "DesProdServ",
        header: "DESCRIPCIÓN",
        size: 150 // larger column
    }
];

const ProductsTable = ({setDatosSeleccionados, datosSeleccionados}) => {

    const [loadingTable, setLoadingTable] = useState(true);
    const [ProdServsData, setProdServData] = useState([]);
    const [AddProductShowModal, setAddProductShowModal] = useState(false);
    const [UpdateProductShowModal, setUpdateProductShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async () => {
        setLoadingTable(true);
        try {
            const AllProductsData = await getAllProducts();
            setProdServData([...AllProductsData]);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        setLoadingTable(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Accede a los datos necesarios del registro (rowData) y llama a tu método
        const {IdInstitutoOK, IdProdServOK, IdProdServBK} = rowData.original;
        // Mostrar en consola los datos del registro
        console.log("IdInstitutoOK: ", IdInstitutoOK);
        console.log("IdProdServOK: ", IdProdServOK);
        console.log("IdProdServBK: ", IdProdServBK);
        // Actualizar el estado de los datos seleccionados
        setDatosSeleccionados({IdInstitutoOK, IdProdServOK, IdProdServBK});
    };

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar.");
          return;
      }
      const product = selectedRows[0]?.original;
      setSelectedProduct(product);
      setUpdateProductShowModal(true);
    };

    const handleDelClick = async (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar.");
          return;
      }
      const product = selectedRows[0]?.original;
      const ProdPK = product[Object.keys(product)[2]];

      console.log('ProdPK: ', ProdPK);
      await delOneProduct(ProdPK);
      await fetchData();
    };

    return (
        <Box>
          <Box>
            <MaterialReactTable
                columns={ProdServColumns}
                data={ProdServsData}
                state={{isLoading: loadingTable}}
                initialState={{ density: "compact", showGlobalFilter: true }}
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
                    </>
                )}
            />
          </Box>
          {/* AddProductModal click cosa que lo abre y cierra */}
          <Dialog open={AddProductShowModal} onClose={() => setAddProductShowModal(false)}>
              <AddProductModal
                  AddProductShowModal={AddProductShowModal}
                  setAddProductShowModal={setAddProductShowModal}
                  onProductAdded={fetchData}/>
          </Dialog>

          {/* Lo mismo de arriba, pero para el UpdateProductModal */}
          <Dialog open={UpdateProductShowModal} onClose={() => setUpdateProductShowModal(false)}>
              <UpdateProductModal
                  UpdateProductShowModal={UpdateProductShowModal}
                  setUpdateProductShowModal={setUpdateProductShowModal}
                  productData={selectedProduct}
                  onProductUpdated={fetchData}/>
          </Dialog>
        </Box>
      );
  };

export default ProductsTable;












/*        
nutria                                                                                             
                                                ...........................                         
                                             ...............:::..............                       
                                            ...........:::::::::::::............                    
                                        ..........:==-:::::::::::::::::............                 
                                        ..........==:::::::::::::::::::++:..........                
                                       ...........::::::::::::::::::::::-:...........               
                                      ............::::::*+:..-:.::=::::::..............             
                                      ............:::-::::.*%%%#.:-::::::..............             
                                    ..............:---::....+#*:.::::::::.:-:...........            
                                    ...........::.::::.....-=#=-...::::=-:..............            
                                    ...:........:===::..............::::.:::.....::.....            
                                  ....::.....:========:.............::...........:......            
                                .....::...:-=============-::...::--===-.........:......             
                            .......::....:======+++===----=============:........:......             
                          .......::.....-=============+------===========:............               
                         ...............==============++-===+++++=======-............               
                     .................:-=+===========++==++=============-...........                
                   ..................:=====+++++=======-=++=============-..........                 
                  ..............:+*=-==========----------===============-..........                 
                 .............:++++++==========-----------==============.........                   
               ..............-+++++++===========----------==+++=======-:.........                   
              ..............:++++++++==============----==========+++=:...........                   
              ..............+++++++++====================+++========-............                   
             ..............-+++++++++==================+++++=======-.............                   
             ..............=+++++++++================++++++++======:......:......                   
             ..............+++++++++================+++++++++====-........:.....                    
             ..............+++++++++===============++++++++++===-........:......                    
             ..............=++++++++==============++++++++++===:........::......                    
             ..............-+++++++==============+++++++++++=-.........::.......                    
             ...............:++++++=============+*+++++++++=:..........:.......                     
              ................:-::......:-=====++++++++++=:....................                     
               ............................:-==+++++++++:....................                       
                  ............................:+++++++-.....................                        
                   .............................:--::...........::..........                        
                      .....................::................:::...........                         
                               ..............:::...........::...........                            
                                    ............:::::::::::............                             
                                          .........................                                 
                                            ...................                                     
                                               ...........                                                                                                                                
 */
