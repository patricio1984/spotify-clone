import React from 'react';
import Header from "./Header";
import "./Body.css";
import { useDataLayerValue } from '../../context/DataLayer';
import { useSoundLayerValue } from '../../context/SoundLayer';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow.js";

const Body = ({spotify}) => {

    const[{current_playlist, tracks, track}] = useDataLayerValue();
    const [{playing, volume}, soundDispatch] = useSoundLayerValue();

    const startPlaying = () => {
      soundDispatch({
          type: "SET_PLAYING",
          playing: true
      });
      soundDispatch({
          type: "SET_VOLUME",
          volume
      });
    };

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: false
        });

        soundDispatch({
          type: "SET_VOLUME",
          volume
      });
    };

    return (
        <article className="body">
            <Header spotify={spotify} />

            <div className="body_info">
                <img src={current_playlist ? current_playlist?.images[0].url : 'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'} alt=""/>
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{current_playlist?.name}</h2>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    {playing ? <PauseCircleFilledIcon onClick={track ? stopPlaying : null}
                                                      className='body_shuffle'/> :
                        <PlayCircleFilledWhiteIcon onClick={track ? startPlaying : null} fontSize='large'
                                              className='body_shuffle'/>}
                    <FavoriteIcon className="body_favorite" fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {tracks?.items.map(track => (
                    <SongRow track={track.track} key={track.track.id} onClick={track ? startPlaying : stopPlaying} />
                ))}
            </div>
        </article>
    )
}

export default Body;
