import React from "react";
import styles from "../globals.scss";
import styles1 from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faChartColumn, faUserGroup, faGamepad, faGear, faArrowRight, faFire } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <nav>
            <FontAwesomeIcon icon={faPersonRunning} className='nav-icons' />
            <FontAwesomeIcon icon={faChartColumn} className='nav-icons' />
            <FontAwesomeIcon icon={faUserGroup} className='nav-icons' />
            <FontAwesomeIcon icon={faGamepad} className='nav-icons' />
            <FontAwesomeIcon icon={faGear} className='nav-icons' />
        </nav>
    );
};

export default NavBar;