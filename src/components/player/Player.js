import React from 'react';
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

const Player = ({spotify}) => {
    return (
        <section className="player">
            <div className="player_body">
                <Sidebar spotify={ spotify } />
                <Body spotify={spotify} />
            </div>

            <Footer spotify={spotify} />
        </section>
    )
}

export default Player;