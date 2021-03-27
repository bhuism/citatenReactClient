import React from "react";
import PropTypes from 'prop-types';
import {Badge} from "../components/Badge";

const BasePage: React.FC = ({children}) => {

    return (
        <>
            <h1>Citaten</h1>
            <main>{children}</main>
            <footer className='layout-footer'>
                <a href="https://github.com/bhuism/citaten" target="_blank" rel="noreferrer">
                    <Badge
                        url={'https://badge.odee.net/github/actuator/bhuism/citaten/master/badge.svg?actuator_url=https://api-citaten.odee.net/actuator/info'}/>
                </a>
                <a href="https://github.com/bhuism/citatenReactClient" target="_blank" rel="noreferrer">
                    <Badge
                        url={'https://badge.odee.net/github/metatag/bhuism/citatenReactClient/master/badge.svg?html_url=https://citaten.odee.net'}/>
                </a>
            </footer>
        </>
    )

}

BasePage.propTypes = {
    children: PropTypes.node.isRequired,
}

export default BasePage;
