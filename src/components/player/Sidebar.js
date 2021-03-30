import React, {useEffect} from 'react';
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import { useDataLayerValue } from "../../context/DataLayer";


const Sidebar = ({spotify}) => {

    const [ { playlists}] = useDataLayerValue();
  
    return (
        <aside className="sidebar">
            <div className="sidebar_wrapper">
                <img className="sidebar_logo" src="https://logodownload.org/wp-content/uploads/2016/09/spotify-logo-branca-white.png" alt="Spotify logo"/>
                <SidebarOption Icon={HomeOutlinedIcon} title="Home" />
                <SidebarOption Icon={SearchIcon} title="Search" />
                <SidebarOption Icon={LibraryMusicOutlinedIcon} title="Your Library" />
                
                <br />
                <strong className="sidebar_title">PLAYLISTS</strong>
                <hr />
                <div className="playlistItems">
                    {playlists?.items?.map(playlist => (
                        <SidebarOption spotify={spotify} title={playlist.name} id={playlist.id} key={playlist.id} />
                    ))}
                    
                </div>
            </div>
        </aside>
       
    )
}

export default Sidebar;
