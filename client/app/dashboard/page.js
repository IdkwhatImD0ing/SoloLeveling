"use client"
import React, { useEffect, useRef } from 'react';
import styles from "../globals.scss";
import styles1 from "./styles.scss";
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faChartColumn, faUserGroup, faGamepad, faGear, faArrowRight, faFire } from "@fortawesome/free-solid-svg-icons";
import Quest from '../quest/page';
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';

export default function Dashboard() {
    return (
        <div className='dashboard'>
            <div className='blobs'>
                <div className='purple-blob1'></div>
                <div className='purple-blob2'></div>
            </div>
            <div className='blur-layer'>
                <nav>
                    <FontAwesomeIcon icon={faPersonRunning} className='nav-icons' />
                    <FontAwesomeIcon icon={faChartColumn} className='nav-icons' />
                    <FontAwesomeIcon icon={faUserGroup} className='nav-icons' />
                    <FontAwesomeIcon icon={faGamepad} className='nav-icons' />
                    <FontAwesomeIcon icon={faGear} className='nav-icons' />
                </nav>
                <div className='menu'>
                    <div className='top-row'>
                            <Link className='exercise' href="/exercise">
                                Start Workout
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                    </div>
                    <div className='panels'>
                        <Quest></Quest>
                        <div className='col2'>
                            <div className='profile'>
                                <h2 className='username'>Annie Wang</h2>
                                <span>
                                    <FontAwesomeIcon icon={faFire} />
                                    <p>5 days</p>
                                </span>
                            </div>
                            <div className='row2'>
                                <div className='stats1'>
                                    <h3>My Progress</h3>
                                </div>
                                <div className='stats2'>
                                    <canvas id="acquisitions"></canvas>
                                </div>
                            </div>
                            <div className='row3'>
                                <div className='leaderboard'>
                                    <h3>Leaderboard</h3>
                                </div>
                                <div className='friends'>
                                    <h3>Friends</h3>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <script type="module" src="./acquisitions.js"></script>
        </div>
    );
}