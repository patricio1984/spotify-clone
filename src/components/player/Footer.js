import React, { useEffect, useState } from 'react';
import "./Footer.css";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../../context/DataLayer";
import { useSoundLayerValue } from "../../context/SoundLayer";
import SidebarOption from "./SidebarOption";


const Footer = ({spotify}) => {

    const [{ track, tracks }, dispatch] = useDataLayerValue();
    const [{audio, playing, volume, repeat, shuffle}, soundDispatch] = useSoundLayerValue();

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

    const setRepeat = () => {
        if(!repeat && shuffle) {
            setShuffle();
        }
        soundDispatch({
            type: "SET_REPEAT",
            repeat: !repeat
        });
    };

    const setShuffle = () => {
        if(!shuffle && repeat) {
            setRepeat();
        }
        soundDispatch({
            type: "SET_SHUFFLE",
            shuffle: !shuffle
        });
    };

    const handleChange = (event, value) => {
        soundDispatch({
            type: "SET_VOLUME",
            volume: value / 100
        });
  };

  if(audio) {
    audio.onended = () => {
        if(shuffle) {
            while(true) {
                let randomTrackNumber = Math.floor((Math.random() * tracks.items.length));
                let randomTrack = tracks.items[randomTrackNumber].track;
                if(track !== randomTrack) {
                    dispatch({
                        type: 'SET_TRACK',
                        track: randomTrack
                    });

                    let wasPlaying = playing;
                    soundDispatch({
                        type: 'SET_PLAYING',
                        playing: false,
                    });

                    let audio = new Audio(randomTrack.preview_url);
                    audio.loop = repeat;
                    soundDispatch({
                        type: 'SET_AUDIO',
                        audio: audio
                    });

                    if(wasPlaying) {
                        soundDispatch({
                            type: 'SET_PLAYING',
                            playing: true,
                        });
                    }

                    document.title = `${randomTrack.name} · ${randomTrack.artists.map((artist) => artist.name).join(', ')}`
                    break
                }
            }
        }
        if(!shuffle && !repeat) {
            soundDispatch({
                type: 'SET_PLAYING',
                playing: false,
            });
        }
    }
}

    return (
        <footer>
            <div className="footer_wrapper">
                <div className="footer_info_responsive">
                    <div className="footer_left_responsive">
                        <img
                            className="footer_albumLogo"
                            src={track ? track.album.images[0].url : ""}
                            alt={track?.name}
                        />
                        <div className="footer_songInfo">
                            <h4>{track ? track.name : "No song selected"}</h4>
                            <p>{track ? track.artists.map((artist) => artist.name).join(", ") : null}</p>
                        </div>
                    </div>
                    <div className="footer_right_responsive">
                        <Grid container spacing={2}>
                        <Grid item>
                            <PlaylistPlayIcon />
                        </Grid>
                        <Grid item>
                            <VolumeDownIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider 
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="off"
                            onChange={handleChange}
                            min={0}
                            max={100}
                            />
                        </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer_left">
                    <img
                        className="footer_albumLogo"
                        src={track ? track.album.images[0].url : ""}
                        alt={track?.name}
                    />
                    <div className="footer_songInfo">
                        <h4>{track ? track.name : "No song selected"}</h4>
                        <p>{track ? track.artists.map((artist) => artist.name).join(", ") : null}</p>
                    </div>
                    </div>
                    <div className="footer_center">
                        <ShuffleIcon onClick={track? setShuffle : null} className={shuffle ? 'footer_green' : 'footer_icon'} />
                        <SkipPreviousIcon className="footer_icon" />
                        {playing ? (
                            <PauseCircleFilledIcon
                                onClick={track ? stopPlaying : null}
                                fontSize="large"
                                className="footer_icon playPauseIcon"
                            />
                            ) : (
                            <PlayCircleFilledWhiteIcon
                                onClick={track ? startPlaying : null}
                                fontSize="large"
                                className="footer_icon playPauseIcon"
                            />
                        )}
                        <SkipNextIcon className="footer_icon" />
                        <RepeatRoundedIcon onClick={track? setRepeat : null} className={repeat ? 'footer_green' : 'footer_icon'} />

                    </div>
                    <div className="footer_right">
                        <Grid container spacing={2}>
                        <Grid item>
                            <PlaylistPlayIcon />
                        </Grid>
                        <Grid item>
                            <VolumeDownIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider 
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="off"
                            onChange={handleChange}
                            min={0}
                            max={100}
                            />
                        </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="footer_icons_responsive">   
                   <div className="footer_icon">
                        <HomeOutlinedIcon/>
                        <p>Home</p>
                    </div>
                    <div className="footer_icon">
                        <SearchIcon />
                        <p>Search</p>
                    </div>
                    <div className="footer_icon">
                        <LibraryMusicOutlinedIcon/>
                        <p>Your Library</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
