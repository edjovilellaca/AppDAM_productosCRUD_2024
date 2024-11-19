import {Box, Tab, Tabs, Stack} from "@mui/material";
import React, {useState} from "react";

const PresentaTabs = ["Presenta","Info_vta", "Info_ad", "Paquete", "Archivos"];

const PresentaNavTab = ({currentRowInPresentaTab, setCurrentNameTabInPresentaTab}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

//FIC: Evento Change
    const handleChange = (e) => {
        setCurrentNameTabInPresentaTab(e.target.innerText.toUpperCase());
        switch (e.target.innerText.toUpperCase()) {
            case "PRESENTA":
                setCurrentTabIndex(0);
                break;
            case "INFO_VTA":
                setCurrentTabIndex(1);
                break;
            case "INFO_AD":
                setCurrentTabIndex(2);
                break;
            case "PAQUETE":
                setCurrentTabIndex(3);
                break;
            case "ARCHIVOS":
                setCurrentTabIndex(4);
                break;
        }
    };

    return (
        <Box sx={{border: (theme) => `1px solid ${theme.palette.divider}`, mx: 1, padding: 0.5}}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {PresentaTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled={currentRowInPresentaTab === null}/>;
                })}
            </Tabs>
        </Box>
    );
};

export default PresentaNavTab;