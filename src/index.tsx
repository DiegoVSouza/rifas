import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routers from './main/routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './main/themes/ChakraUITheme';
import { ShopCarProvider } from './main/hooks/useShopCar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ToastContainer />
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
            <ShopCarProvider>
              <BrowserRouter>
                <Routers />
              </BrowserRouter>
            </ShopCarProvider>
        </ChakraProvider>
      </Provider>

    </IconContext.Provider>
  </React.StrictMode>
);
