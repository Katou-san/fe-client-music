'use client'
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import Sidebar from '@/layouts/SideBar/sidebar';
import "./_pages.scss"
import React, { ReactNode } from 'react';
import { useLayout } from '@/contexts/providerLayout';
import Popup from '@/layouts/Popup/popup';
import AlbumModal from '@/components/customs/modal/Album/albumModal';

const Layout = ({ children }: { children: ReactNode }) => {
    const { is_Popup } = useLayout()
    return (
        <div className='layoutFarme'>
            <div className='layoutContent'>
                <Sidebar />
                <div className='Content' id={`${is_Popup ? "" : 'notShow'}`}>
                    <div className="MainContent">
                        <Header />
                        {children}
                        <AlbumModal />
                    </div>
                    <div className="PopupContent">
                        <Popup />
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Layout;
