
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './Navbar';

const Layout: React.FC = () => {
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    );
};

export default Layout;
