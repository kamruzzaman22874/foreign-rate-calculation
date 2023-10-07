import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const Layout = ({children}) => {
    return (
        <div>
            <main>
                <Container>
                    <Navbar />
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;