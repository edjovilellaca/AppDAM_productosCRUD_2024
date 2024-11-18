import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateOneProduct } from "../../services/remote/put/UpdateOneProduct";

const UpdateProductModal = ({ UpdateProductShowModal, setUpdateProductShowModal, productData, onProductUpdated }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdProdServOK: productData?.IdProdServOK || "",
            IdProdServBK: productData?.IdProdServBK || "",
            DesProdServ: productData?.DesProdServ || "",
            Matriz: productData?.Matriz || "",
            IdProdServMaOK: productData?.IdProdServMaOK || "",
            IdProdServMaBK: productData?.IdProdServMaBK || "",
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string(),
            IdProdServBK: Yup.string(),
            DesProdServ: Yup.string(),
            Matriz: Yup.string()
                .max(1, "Solo se permite una letra")
                .matches(/^[NS]+$/, "Solo se permiten letras S/N"),
            IdProdServMaOK: Yup.string()
                .matches(/^[a-zA-Z0-9-]+$/, "Solo se permiten caracteres alfanuméricos y el símbolo '-'"),
            IdProdServMaBK: Yup.string(),
        }),

        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                
                const updatedProduct = await UpdateOneProduct(values.IdProdServOK, values);
                setMensajeExitoAlert("Producto actualizado correctamente.");
                onProductUpdated(updatedProduct);
                setUpdateProductShowModal(false);
            } catch (error) {
                setMensajeErrorAlert("No se pudo actualizar el producto. Verifica los datos.");
            } finally {
                setLoading(false);
            }
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
    };

    return (
        <Dialog open={UpdateProductShowModal} onClose={() => setUpdateProductShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Actualizar Producto</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)}
                        helperText={formik.touched.IdProdServOK && formik.errors.IdProdServOK}
                        disabled // No editable porque es clave primaria
                    />
                    <TextField
                        id="IdProdServBK"
                        label="IdProdServBK*"
                        value={formik.values.IdProdServBK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)}
                        helperText={formik.touched.IdProdServBK && formik.errors.IdProdServBK}
                    />
                    <TextField
                        id="DesProdServ"
                        label="DesProdServ*"
                        value={formik.values.DesProdServ}
                        {...commonTextFieldProps}
                        error={formik.touched.DesProdServ && Boolean(formik.errors.DesProdServ)}
                        helperText={formik.touched.DesProdServ && formik.errors.DesProdServ}
                    />
                    <TextField
                        id="Matriz"
                        label="Matriz*"
                        value={formik.values.Matriz}
                        {...commonTextFieldProps}
                        error={formik.touched.Matriz && Boolean(formik.errors.Matriz)}
                        helperText={formik.touched.Matriz && formik.errors.Matriz}
                    />
                    <TextField
                        id="IdProdServMaOK"
                        label="IdProdServMaOK*"
                        value={formik.values.IdProdServMaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServMaOK && Boolean(formik.errors.IdProdServMaOK)}
                        helperText={formik.touched.IdProdServMaOK && formik.errors.IdProdServMaOK}
                    />
                    <TextField
                        id="IdProdServMaBK"
                        label="IdProdServMaBK*"
                        value={formik.values.IdProdServMaBK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServMaBK && Boolean(formik.errors.IdProdServMaBK)}
                        helperText={formik.touched.IdProdServMaBK && formik.errors.IdProdServMaBK}
                    />
                </DialogContent>
                <DialogActions>
                    <Box m="auto">
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
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setUpdateProductShowModal(false)}
                    >
                        Cerrar
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Guardar
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateProductModal;
