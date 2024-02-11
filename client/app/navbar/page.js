import {
  faArrowRight,
  faChartColumn,
  faFire,
  faGamepad,
  faGear,
  faPersonRunning,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

import styles from "../globals.scss";

import styles1 from "./styles.scss";

const NavBar = () => {
  return (
      <nav><Link href = "/exercise">
      <FontAwesomeIcon icon = {faPersonRunning} className = "nav-icons" />
      </Link>
      <Link href="/dashboard ">
           < FontAwesomeIcon icon = {faChartColumn} className = "nav-icons" />
      </Link>
      <FontAwesomeIcon icon={faUserGroup} className="nav-icons" />
      <FontAwesomeIcon icon = {faGamepad} className = "nav-icons" />
      <Link href = "/">
      <FontAwesomeIcon icon = {faGear} className = "nav-icons" />
      </Link>
    </nav>);
};

export default NavBar;
