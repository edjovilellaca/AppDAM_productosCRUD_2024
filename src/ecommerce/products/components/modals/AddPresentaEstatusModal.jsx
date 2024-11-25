import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusValues } from "../../helpers/estatusValues";
import { AddOneEstatus } from "../../services/remote/post/AddOneEstatus";
import { GetEstatus } from "../../services/remote/get/GetEstatus";

const AddEstatusModal = ({AddEstatusShowModal, setAddEstatusShowModal, onEstatusAdded, prodKey}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [opciones, setOpciones] = useState([]);

    const formik = useFormik({
        initialValues: {
            IdProdServPK: prodKey,
            IdProdServOK: prodKey,
            IdTipoEstatusOK: "",
            Actual: "",
            Observacion: ""
        },
        validationSchema: Yup.object({
            Actual: Yup.string()
                .required("Campo requerido")
                .max(1, 'Solo se permite una letra')
                .matches(/^[NS]+$/, 'Solo se permiten letras S/N'),
            Observacion: Yup.string().required("Campo requerido"),
        }),
        
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Estatus = EstatusValues(values);
                console.log("<<Estatus>>", Estatus);
                await AddOneEstatus(Estatus, prodKey);

                setMensajeExitoAlert("Estatus creado y guardado Correctamente");
                onEstatusAdded();

            } catch (e) {
                
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Estatus");

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
    
    const fetchOpciones = async () => {
        try {
            const response = await GetEstatus(prodKey);
            setOpciones(response); 
        } catch (error) {
            console.error("Error obteniendo opciones: ", error);
        }
    };

    useEffect(() => {
        fetchOpciones();
    }, [prodKey]);
      
    return(
        <Dialog 
            open={AddEstatusShowModal}
            onClose={() => setAddEstatusShowModal(false)}
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
                    <Select
                        id="IdTipoEstatusOK"
                        value={formik.values.IdTipoEstatusOK || ""}
                        onChange={ (event) => formik.setFieldValue("IdTipoEstatusOK", event.target.value) }
                        fullWidth
                        displayEmpty
                        error={
                            formik.touched.IdTipoEstatusOK &&
                            Boolean(formik.errors.IdTipoEstatusOK)
                        }>
                        <MenuItem value="" disabled>
                            Seleccione una opción
                        </MenuItem>
                        {opciones.map((opcion) => (
                            <MenuItem 
                                key={opcion.IdTipoEstatusOK} 
                                value={opcion.IdTipoEstatusOK}>
                                {opcion.IdTipoEstatusOK}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        id="Actual"
                        label="Actual*"
                        value={formik.values.Actual}
                        {...commonTextFieldProps}
                        error={ formik.touched.Actual && Boolean(formik.errors.Actual) }
                        helperText={ formik.touched.Actual && formik.errors.Actual }
                    />
                    <TextField
                        id="Observacion"
                        label="Observacion*"
                        value={formik.values.Observacion}
                        {...commonTextFieldProps}
                        error={ formik.touched.Observacion && Boolean(formik.errors.Observacion) }
                        helperText={ formik.touched.Observacion && formik.errors.Observacion }
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
                        onClick={() => setAddEstatusShowModal(false)}
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
export default AddEstatusModal;