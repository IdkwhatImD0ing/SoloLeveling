import {
  faArrowRight,
  faChartColumn,
  faFire,
  faGamepad,
  faGear,
  faPersonRunning,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "../globals.scss";

import styles1 from "./styles.scss";

const NavBar = () => {
  return (
    <nav>
      <FontAwesomeIcon icon={faPersonRunning} className="nav-icons" />
      <FontAwesomeIcon icon={faChartColumn} className="nav-icons" />
      <FontAwesomeIcon icon={faUserGroup} className="nav-icons" />
      <FontAwesomeIcon icon={faGamepad} className="nav-icons" />
      <FontAwesomeIcon icon={faGear} className="nav-icons" />
    </nav>
  );
};

export default NavBar;
