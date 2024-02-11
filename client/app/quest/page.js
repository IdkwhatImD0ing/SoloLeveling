import React from "react";
import styles from "../globals.scss";
import styles1 from "./quests.scss";

const Quests = () => {
    return (
        <div className="quests">
            <h3>Quests</h3>
            <div className="divider"></div>
            <div className="sections">
                <div className="dailies">
                    <h4>Daily</h4>
                    <div className="divider1"></div>
                    <div className="quest">
                        <h5 className="quest-title">Morning Stretch</h5>
                        <p className="quest-desc">Stretch for 5 - 10 minutes :D</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Heroic Jumps</h5>
                        <p className="quest-desc">Do 20 jumping jacks</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Adjective Exercise</h5>
                        <p className="quest-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className="weeklies">
                    <h4>Weekly</h4>
                    <div className="divider1"></div>
                    <div className="quest">
                        <h5 className="quest-title">Morning Stretch</h5>
                        <p className="quest-desc">Stretch for 5 - 10 minutes :D</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Heroic Jumps</h5>
                        <p className="quest-desc">Do 20 jumping jacks</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Adjective Exercise</h5>
                        <p className="quest-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className="events">
                    <h4>Events</h4>
                    <div className="divider1"></div>
                    <div className="quest">
                        <h5 className="quest-title">Morning Stretch</h5>
                        <p className="quest-desc">Stretch for 5 - 10 minutes :D</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Heroic Jumps</h5>
                        <p className="quest-desc">Do 20 jumping jacks</p>
                    </div>
                    <div className="quest">
                        <h5 className="quest-title">Adjective Exercise</h5>
                        <p className="quest-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                div
            </div>
            
        </div>
    );
};

export default Quests;