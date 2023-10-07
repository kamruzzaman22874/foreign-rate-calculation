// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Container, useMediaQuery } from '@mui/material';
// import logo from "../../src/image/scs.png"





// const drawerWidth = 240;
// const navItems = ['Calculate'];

// export default function Navbar(props) {
//     const { window } = props;
//     const [mobileOpen, setMobileOpen] = React.useState(false);

//     const handleDrawerToggle = () => {
//         setMobileOpen((prevState) => !prevState);
//     };




//     const container = window !== undefined ? () => window().document.body : undefined;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar component="nav" sx={{
//                 backgroundColor: "transparent",
//                 borderBottom: "2px solid offWhite",
//             }}>
//                 <Container>
//                     <Toolbar>
//                             <IconButton
//                                 color="inherit"
//                                 aria-label="open drawer"
//                                 edge="start"
//                                 onClick={handleDrawerToggle}
//                                 sx={{
//                                     mr: 2,
//                                     display: { sm: 'none' },
//                                     color: "black"

//                                 }}
//                             >
//                                 <MenuIcon />
//                             </IconButton>
//                             <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
//                                 <Image src={logo} alt="" style={{
//                                     width: "80px",
//                                     height: "60px"
//                                 }} />
//                             </Box>





//                     </Toolbar>
//                 </Container>
//             </AppBar>

//             <nav>
//                 <Drawer
//                     container={container}
//                     variant="temporary"
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{
//                         keepMounted: true, // Better open performance on mobile.
//                     }}
//                     sx={{
//                         display: { xs: 'block', sm: 'none' },
//                         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//             </nav>

//             <Box component="main">

//                 <Toolbar />
//             </Box>
//         </Box>
//     );
// }



// // style = {{ display: "flex", gap: "8px" }}


import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import logo from "../../src/image/scs.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ flexGrow: 1, display: { sm: 'block' } }}>
                <Image src={logo} alt="" style={{
                    width: "100%",
                    height: "60px"
                }} />
            </Box>
            <Divider />
            <Box style={{ display: "flex", gap: "8px" }} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <div style={{ backgroundColor: "rgb(12, 74, 154)", borderRadius: "5px", width: "100%", marginTop: "10px" }} >
                    <Button variant="contained" disableElevation>Pickup Request</Button>
                </div>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{
                backgroundColor: "transparent",
                borderBottom: "2px solid offWhite",
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            flexGrow:1,
                            mr: 60,
                            display: { sm: 'none' },
                            color: "black"

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Image src={logo} alt="" style={{
                            width: "80px",
                            height: "60px"
                        }} />
                    </Box>
                    {/* <Box sx={{ display: { xs: 'flex', sm: 'block' }}}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#000' }}>
                                {item}
                            </Button>
                        ))}
                    </Box> */}
                    <Box sx={{ display: { lg:"flex", xl:"flex", xs:"none", sm:"flex", alignItems: "flex-end" } }}>
                        <div style={{ backgroundColor: "rgb(12, 74, 154)", borderRadius: "5px", }}  >
                            <Button sx={{ width: { xs: "170px", sm: "170px", md: "auto", lg: "auto", xl: "auto"} }} variant="contained" disableElevation>Pickup Request</Button>
                        </div>
                        <AccountCircleIcon sx={{ color: "rgb(12, 125, 131)", fontSize: "40px" }} />
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />

            </Box>
        </Box>
    );
}
export default Navbar;