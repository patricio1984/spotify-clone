import React from 'react';
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from '../../context/DataLayer';
import { loginUrl } from '../../config/spotify';

const Header = () => {

    const [{ user}, dispatch ] = useDataLayerValue();

    console.log(user)
    ;
    return (
        <header className="header">
            <div className="header_left">
                <SearchIcon />
                <input 
                    placeholder="Search for Artists, Songs, or Podcasts"
                    type="text"
                />
            </div>
            <a href={loginUrl} className="header_right">
                <Avatar src={user?.images[0]?.url} alt={`Avatar de ${user?.display_name}`} />
                <h4>{user?.display_name}</h4>
            </a>
        </header>
    )
}

export default Header;
