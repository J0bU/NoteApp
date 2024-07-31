import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { setActiveTag } from '../../store/note/noteSlice';

export const SidebarTag = ({ value, id }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveTag(value));
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={onClickNote}>
                <Grid container sx={{
                    backgroundColor: 'primary.list', padding: 1, borderRadius: 2
                }}>
                    <ListItemText primary={value} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
