import React, { useEffect } from 'react';
import './App.css';
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import { getTokenFromUrl } from './config/spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {

  const [ { token }, dispatch ] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {

      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: "SET_USER",
          user
        });
      });
      
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists
        });
        //console.log(playlists.items[0].id);
      });  
    }
  }, [token, dispatch]);


  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
