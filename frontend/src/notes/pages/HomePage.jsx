import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'

export const HomePage = () => {

  return (
   <Grid 
    container 
    spacing={0}
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    sx={{ minHeight: '100vh', backgroundColor: 'white', padding: 4 }}

    >   
        <Grid item> 
            <motion.div 
            style={{ backgroundColor: '#dd33fa', 
                borderRadius: 50, height: 300, width: 300, marginBottom: -200}} 
            animate={{ rotate: [0,250, 250, 0], x: [0, 200, 200, 0]}} 
            transition={{ repeat: Infinity, duration: 2}}>
            </motion.div>
            
        </Grid>
        <Grid item> 
            <motion.div 
            style={{ backgroundColor: '#ffee33', 
                borderRadius: 50, height: 300, width: 300}} 
            animate={{ rotate: [0, 200, 200, 0], x: [0, 200, 200, 0]}} 
            transition={{ repeat: Infinity, duration: 2}}>
            </motion.div>
            
        </Grid>
        <Grid item>
            <Typography variant='h2' sx={{ mt: 2}}>Notes App</Typography>
        </Grid>
        <Grid item>
            <Link component={ RouterLink } to="/notes" color={'#212121'}>
                <Typography variant='h4'>Start here!</Typography>
            </Link>
        </Grid>
   </Grid>
  )
}
