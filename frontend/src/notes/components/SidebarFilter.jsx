import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { ArchiveOutlined, CheckCircle, TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { setActiveNote } from '../../store/note';

export const SidebarFilter = ({ title, description, id, isActived, tags }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ title, description, id, tags }));
    }

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + "..."
            : title;
    }, [title]);

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={description} />
                    <ListItemText secondary={tags.map(tag => (" " + tag))} />
                </Grid>
                <ListItemIcon>
                    {(!!isActived) ? <CheckCircle sx={{ color: 'primary.save' }} /> : <ArchiveOutlined sx={{ color: "primary.icon" }} />}
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}
