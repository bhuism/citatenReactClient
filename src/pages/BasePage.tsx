import React from "react";
import {Menu} from "../components/Menu";

// eslint-disable-next-line react/prop-types
const BasePage: React.FC = ({children}) => {

    const gitsha = 'unknown';

    return (
        <>
            <nav><Menu/></nav>
            <main>{children}</main>
            <footer className='layout-footer'><img
                src={'https://badge.odee.net/gitlab/sha/154/master/' + gitsha + '/badge.svg'}
                alt='Version badge'/>
            </footer>
        </>
    )

};

export default BasePage;
