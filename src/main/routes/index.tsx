// Routes
import Footer from "../../Presentation/Components/Footer/Footer";
import AppRoutes from "./app.routes";
import Header from "../../Presentation/Components/Header/Header";
import ScrollToTopOnNavigate from "../../utils/ScrollToTopOnNavigate";
import { useLocation } from "react-router-dom";

export default function Routes() {
    const location = useLocation();
    const currentUrl = location.pathname;

    
    return (
        <>
            <ScrollToTopOnNavigate />
            {!(currentUrl === '/login' || currentUrl === '/register') && <Header />}
            <AppRoutes />
            {!(currentUrl === '/login' || currentUrl === '/register') && <Footer />}
            
        </>
    )
} 
