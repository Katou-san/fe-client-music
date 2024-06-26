'use client'
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import Sidebar from '@/layouts/SideBar/sidebar';
import "./_pages.scss"
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='layoutFarme'>
            <div className='layoutContent'>
                <Sidebar />
                <div className='Content' id='notShow'>
                    <div className="MainContent">
                        <Header />
                        {children}
                    </div>
                    <div className="PopupContent">
                        hello world
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Layout;
