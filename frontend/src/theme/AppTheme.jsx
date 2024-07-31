import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {  greyTheme } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={greyTheme}>
        <CssBaseline />
        {/* This children is going to be our NoteApp */}
        { children }
    </ThemeProvider>
  )
}
