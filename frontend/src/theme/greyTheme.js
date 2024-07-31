import { createTheme } from "@mui/material";

export const greyTheme = createTheme({
    typography: {
        "fontFamily": `"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        primary: {
            main: '#fafafa',
            button: '#607d8b',
            details: '#fff176',
            strong: '#424242',
            icon: '#ffd600',
            archive: '#2979ff', 
            delete: '#ff3d00',
            save: '#00a152',
            list: '#f5f5f5'
        },
        secondary: {
            main: '#4444',
            hover: '#ffd600'
        },
        error: {
            main: '#d55c61ff'
        }
    }
})