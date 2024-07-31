import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

const drawerWidth = 280;

export const NoteLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        {/* Navbar  */}
        <Navbar drawerWidth={drawerWidth} />

        {/* Sidebar */}
        <Sidebar drawerWidth={drawerWidth}/>
        <Box component='main'
        sx={{ flexGrow: 1, padding: 3 }}
        >
            {/* Toolbar  */}
            <Toolbar />
            { children }
        </Box>
    </Box>
  )
}
