import * as React from 'react';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';


const defaultTheme = createTheme();


export default function Layout({ children }) {
    return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar/>
        {/* Yield the content here */}
        <div style={{ margin: `0 auto`, maxWidth: 1280, padding: `0 1rem` }}>
            {children}
        </div>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
     
    )
  }
