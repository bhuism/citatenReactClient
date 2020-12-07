import React from "react";
import {Menu} from "../components/Menu";
import PropTypes from 'prop-types';

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

BasePage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BasePage;
