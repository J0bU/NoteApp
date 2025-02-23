import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth }) => {

    const { notes } = useSelector(state => state.note);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        Notes
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map((note) => (
                            <SidebarItem key={note.id} {...note} />))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
