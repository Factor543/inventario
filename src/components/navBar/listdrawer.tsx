/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, List, ListItemIcon, ListItemText, Divider, ListItemButton } from "@mui/material"
import { NavLink } from "react-router"

export const NavListDrawer = ({navArrayLinks,setOpen}:any) =>{
    return (
        <Box sx={{ width:250 }}>
            <Box 
                sx={{ 
                    width: '85%', 
                    height: 80, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 1,
                    mb: 1
                }}
            >
                <img 
                    src="public/imgs/logo.png" 
                    alt="Agua+Vida Logo" 
                    style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                    }} 
                />
            </Box>
            <Divider />
            <nav>
                <List disablePadding>
                    {
                        navArrayLinks.map((navLink:any) => (
                        <>
                            <ListItemButton
                                component={NavLink}
                                to={navLink.path}
                                onClick={()=>setOpen(false)}
                            >
                                <ListItemIcon>
                                    {navLink.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={navLink.tittle}
                                />
                            </ListItemButton>
                            <Divider/>
                        </>
                    ))}
                </List>
            </nav>
        </Box>
    )
}