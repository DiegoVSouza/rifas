// Routes
import Footer from "../../Presentation/Components/Footer/Footer";
import AppRoutes from "./app.routes";
import Header from "../../Presentation/Components/Header/Header";
import ScrollToTopOnNavigate from "../../utils/ScrollToTopOnNavigate";
import { useLocation } from "react-router-dom";
import { handlePageReload } from "../../utils/EraseLocalStorage";
import { useEffect } from "react";

export default function Routes() {
    const location = useLocation();
    const currentUrl = location.pathname;

    // useEffect(() => {
    //     const token = localStorage.getItem("@token");
    //     if (token)
    //         handlePageReload();
    // }, []);

    return (
        <>
            <ScrollToTopOnNavigate />
            {!(currentUrl === '/login' || currentUrl === '/register') && <Header />}
            <AppRoutes />
            {!(currentUrl === '/login' || currentUrl === '/register') && <Footer />}

        </>
    )
} 
