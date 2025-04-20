import { 
    Drawer, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography,  
} from "@mui/material";
import { useState } from "react";
import { NavListDrawer } from "./listdrawer";
import MenuIcon from '@mui/icons-material/Menu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavBar = ({navArrayLinks}:any) => {
    const [open, setOpen] = useState(false)

    return (
        <> 
            <AppBar 
                position="static"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={()=>setOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{flexGrow:1}}
                    >
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor="left"
                onClose={()=>setOpen(false)}
            >
                <NavListDrawer
                    navArrayLinks={navArrayLinks}
                    setOpen ={setOpen}
                />
            </Drawer>
        </>
    );
}

export default NavBar