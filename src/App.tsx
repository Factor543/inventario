import { Container } from "@mui/material";
import NavBar from "./components/navBar/navbar.tsx"
import {Route, Routes} from "react-router"
import Dashboard from "./pages/dashboard.tsx";
import Management from "./pages/management.tsx";
import Products from "./pages/products.tsx";
import { HomeFilled, Inventory, Store } from "@mui/icons-material";

const App = () =>{
    const navArrayLinks =[
        {
            path:"/",
            icon: <HomeFilled/>,
            element:<Dashboard/>,
            tittle:"Inicio"
        },
        {
            path:"/products",
            icon: <Inventory/>,
            element:<Products/>,
            tittle:"Productos"
        },
        {
            path:"/management",
            icon: <Store/>,
            element:<Management/>,
            tittle:"Gestion"
        },
    ]
    return (
        <>
            <NavBar
                navArrayLinks={navArrayLinks}
            />
            <Container 
                sx={{
                    mt:"5%"
                }}
                maxWidth="xl"
            >
                <Routes>  
                    {
                    navArrayLinks.map((navLink)=>(
                        <Route
                            path={navLink.path}
                            element={navLink.element}
                        />
                    ))}
                </Routes>
            </Container>
        </>
    )
}
export default App