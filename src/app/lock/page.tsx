'use client'
import React from 'react';
import './_lockPage.scss'
import { useRouter } from 'next/navigation';
const LockPage = () => {
    const routes = useRouter()
    const handleRoutes = () => {
        routes.push('/auths')
    }
    return (<>
        <section className="wrapper">

            <div className="container">

                <div id="scene" className="scene" data-hover-only="false">


                    <div className="circle" data-depth="1.2"></div>

                    <div className="one" data-depth="0.9">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <div className="two" data-depth="0.60">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <div className="three" data-depth="0.40">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <p className="p404" data-depth="0.50">You are banned</p>
                    <p className="p404" data-depth="0.10">You are banned</p>

                </div>

                <div className="text">
                    <article>
                        <p>Oh oh! It looks like your account has been locked. Please return to the login page!</p>
                        <button onClick={handleRoutes}>Go to login</button>
                    </article>
                </div>

            </div>
        </section>
    </>
    );
}

export default LockPage;
