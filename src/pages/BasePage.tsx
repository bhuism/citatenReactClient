import React from "react";
import PropTypes from 'prop-types';
import {Badge} from "../components/Badge";

const BasePage: React.FC = ({children}) => {

    return (
        <>
            <main>{children}</main>
            <footer className='layout-footer'>
                <a href="https://github.com/bhuism/citaten" target="_blank" rel="noreferrer">
                    <Badge url={'https://badge.odee.net/github/actuator/bhuism/citaten/master/badge.svg?actuator_url=https://api-citaten.odee.net/actuator/info'} />
                </a>
                <a href="https://github.com/bhuism/citatenReactClient" target="_blank" rel="noreferrer">
                    <Badge url={'https://badge.odee.net/github/sha/bhuism/citatenReactClient/master/' + process.env.REACT_APP_GIT_SHA + '/badge.svg'}/>
                </a>
            </footer>
        </>
    )

}

BasePage.propTypes = {
    children: PropTypes.node.isRequired,
}

export default BasePage;
