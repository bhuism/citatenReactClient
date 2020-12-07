import React from "react";
import {Menu} from "../components/Menu";
import PropTypes from 'prop-types';

const BasePage: React.FC = ({children}) => {

    return (
        <>
            <nav><Menu/></nav>
            <main>{children}</main>
            <footer className='layout-footer'>
                <img src={'https://badge.odee.net/github/sha/bhuism/citatenReactClient/master/' + process.env.REACT_APP_GIT_SHA + '/badge.svg'} alt='Version badge'/>
            </footer>
        </>
    )

};

BasePage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BasePage;
