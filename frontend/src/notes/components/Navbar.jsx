import { MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

export const Navbar = ( { drawerWidth = 240 } ) => {
  return (
    <AppBar 
    position='fixed'
    sx={{ 
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        marginLeft: {sm: `${drawerWidth}px`}
    }}
    > 
        <Toolbar>
            <IconButton 
            color='inherit'
            edge='start'
            sx={{ marginRight: 2, display: {sm: 'none'}}}>
                <MenuOutlined />
            </IconButton>
            <Grid container
            direction='row'
            justifyContent='space-between'
            alignItems='center' >
                <Typography variant='h6' noWrap component='div'> Note App </Typography>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
