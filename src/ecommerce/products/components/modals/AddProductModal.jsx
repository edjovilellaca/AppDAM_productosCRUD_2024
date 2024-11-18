import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductValues } from "../../helpers/productsValues";
import { AddOneProduct } from "../../../products/services/remote/post/AddOneProduct";

const AddProductModal = ({AddProductShowModal, setAddProductShowModal, onProductAdded}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdProdServOK: "",
            IdProdServBK: "",
            DesProdServ: "",
            Matriz: "",
            IdProdServMaOK: "",
            IdProdServMaBK: "",
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdProdServBK: Yup.string().required("Campo requerido"),
            DesProdServ: Yup.string().required("Campo requerido"),
            Matriz: Yup.string()
                .required("Campo requerido")
                .max(1, 'Solo se permite una letra')
                .matches(/^[NS]+$/, 'Solo se permiten letras S/N'),
            IdProdServMaOK: Yup.string()
                .required("Campo requerido")
                .matches(/^[a-zA-Z0-9-]+$/, 'Solo se permiten caracteres alfanuméricos y el simbolo "-"'),
            IdProdServMaBK: Yup.string().required("Campo requerido"),
        }),
        
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {

                const Product = ProductValues(values);
                console.log("<<Product>>", Product);
                await AddOneProduct(Product);

                setMensajeExitoAlert("Producto creado y guardado Correctamente");
                onProductAdded();

            } catch (e) {
                
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Producto");

            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };
    return(
        <Dialog 
            open={AddProductShowModal}
            onClose={() => setAddProductShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Producto</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK) }
                        helperText={ formik.touched.IdProdServOK && formik.errors.IdProdServOK }
                    />
                    <TextField
                        id="IdProdServBK"
                        label="IdProdServBK*"
                        value={formik.values.IdProdServBK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK) }
                        helperText={ formik.touched.IdProdServBK && formik.errors.IdProdServBK }
                    />
                    <TextField
                        id="DesProdServ"
                        label="DesProdServ*"
                        value={formik.values.DesProdServ}
                        {...commonTextFieldProps}
                        error={ formik.touched.DesProdServ && Boolean(formik.errors.DesProdServ) }
                        helperText={ formik.touched.DesProdServ && formik.errors.DesProdServ }
                    />
                    <TextField
                        id="Matriz"
                        label="Matriz*"
                        value={formik.values.Matriz}
                        {...commonTextFieldProps}
                        error={ formik.touched.Matriz && Boolean(formik.errors.Matriz) }
                        helperText={ formik.touched.Matriz && formik.errors.Matriz }
                    />
                    <TextField
                        id="IdProdServMaOK"
                        label="IdProdServMaOK*"
                        value={formik.values.IdProdServMaOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdProdServMaOK && Boolean(formik.errors.IdProdServMaOK) }
                        helperText={ formik.touched.IdProdServMaOK && formik.errors.IdProdServMaOK }
                    />
                    <TextField
                        id="IdProdServMaBK"
                        label="IdProdServMaBK*"
                        value={formik.values.IdProdServMaBK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdProdServMaBK && Boolean(formik.errors.IdProdServMaBK) }
                        helperText={ formik.touched.IdProdServMaBK && formik.errors.IdProdServMaBK }
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {console.log("mensajeExitoAlert", mensajeExitoAlert)}
                        {console.log("mensajeErrorAlert", mensajeErrorAlert)}
                        {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                        )}
                        {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                        )}
                    </Box>

                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setAddProductShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                     {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading} >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddProductModal;