import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PresentaValues } from "../../helpers/presentaValues";
import { AddOnePresenta } from "../../services/remote/post/AddOnePresenta";

const AddPresentaModal = ({AddPresentaShowModal, setAddPresentaShowModal, onPresentaAdded, prodKey, prodBK}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdPresentaOK: prodKey + '-',
            IdPresentaBK: prodBK + '-',
            CodigoBarras: "",
            DesPresenta: "",
            Principal: "",
            Indice: ""
        },
        validationSchema: Yup.object({
            IdPresentaOK: Yup.string().required("Campo requerido"),
            IdPresentaBK: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string().required("Campo requerido"),
            DesPresenta: Yup.string().required("Campo requerido"),
            Principal: Yup.string()
                .required("Campo requerido")
                .max(1, 'Solo se permite una letra')
                .matches(/^[NS]+$/, 'Solo se permiten letras S/N'),
            Indice: Yup.string().required("Campo requerido"),
        }),
        
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Presenta = PresentaValues(values);
                console.log("<<Presenta>>", Presenta);
                await AddOnePresenta(prodKey, Presenta);

                setMensajeExitoAlert("Presenta creado y guardado Correctamente");
                onPresentaAdded();

            } catch (e) {
                
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Presenta");

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
            open={AddPresentaShowModal}
            onClose={() => setAddPresentaShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Estatus</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdPresentaOK"
                        label="IdPresentaOK*"
                        value={formik.values.IdPresentaOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK) }
                        helperText={ formik.touched.IdPresentaOK && formik.errors.IdPresentaOK }
                    />
                    <TextField
                        id="IdPresentaBK"
                        label="IdPresentaBK*"
                        value={formik.values.IdPresentaBK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdPresentaBK && Boolean(formik.errors.IdPresentaBK) }
                        helperText={ formik.touched.IdPresentaBK && formik.errors.IdPresentaBK }
                    />
                    <TextField
                        id="CodigoBarras"
                        label="CodigoBarras*"
                        value={formik.values.CodigoBarras}
                        {...commonTextFieldProps}
                        error={ formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras) }
                        helperText={ formik.touched.CodigoBarras && formik.errors.CodigoBarras }
                    />
                    <TextField
                        id="DesPresenta"
                        label="DesPresenta*"
                        value={formik.values.DesPresenta}
                        {...commonTextFieldProps}
                        error={ formik.touched.DesPresenta && Boolean(formik.errors.DesPresenta) }
                        helperText={ formik.touched.DesPresenta && formik.errors.DesPresenta }
                    />
                    <TextField
                        id="Principal"
                        label="Principal*"
                        value={formik.values.Principal}
                        {...commonTextFieldProps}
                        error={ formik.touched.Principal && Boolean(formik.errors.Principal) }
                        helperText={ formik.touched.Principal && formik.errors.Principal }
                    />
                    <TextField
                        id="Indice"
                        label="Indice*"
                        value={formik.values.Indice}
                        {...commonTextFieldProps}
                        error={ formik.touched.Indice && Boolean(formik.errors.Indice) }
                        helperText={ formik.touched.Indice && formik.errors.Indice }
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
                        onClick={() => setAddPresentaShowModal(false)}
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
export default AddPresentaModal;