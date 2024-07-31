import React from 'react';
import { useSelector } from 'react-redux';

import { SearchOffOutlined } from '@mui/icons-material';
import { Button, Grid, List, TextField, Typography } from '@mui/material';

import { useSearchTag } from '../../hooks/useSearchTag';
import { SidebarFilter } from './SidebarFilter';

export const NoteFilter = ({ onChange }) => {
    const { startSearchingFilter } = useSearchTag();
    const { active: note, notes, filter } = useSelector(state => state.note);

    const searchFilter = () => {
        startSearchingFilter();
    }
    return (
        <Grid container direction={"column"}>
            <Grid item>
                <Typography fontSize={39} fontWeight={"light"} marginTop={1} marginBottom={2}>
                    Filters!
                </Typography>
            </Grid>
            <Grid item>
                <TextField type='text'
                    name='filter'
                    fullWidth
                    placeholder='Tag here!'
                    label='Tags'
                    onChange={onChange}
                    sx={{
                        border: 'none', mb: 1, color: 'black'
                    }} />
            </Grid>
            <Grid item>
                <Button onClick={searchFilter}
                    sx={{ color: "primary.archive" }}>
                    <SearchOffOutlined />
                    Search
                </Button>
            </Grid>
            <Grid item>
                <List>
                    {
                        filter.map((note, index) => (
                            note && <SidebarFilter key={index} {...note} />))
                    }
                </List>
            </Grid>
        </Grid>
    )
}
