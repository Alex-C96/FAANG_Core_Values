import React, { useEffect, useRef, useState } from "react";
import Lottie from 'lottie-react';
import playAnimationData from '../../lotties/play-button-2.json';
import './AudioPlayer.css';

export default function AudioPlayer({ src }) {
    const audioRef = useRef();
    const playDefaultLottieRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };

    const togglePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
            playDefaultLottieRef.current.setDirection(-1);
            playDefaultLottieRef.current.play()
        } else {
            playDefaultLottieRef.current.setDirection(1);
            playDefaultLottieRef.current.playSegments([0,72], true);
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handleLoadData = () => {
        setDuration(audioRef.current.duration);
    }

    const handleEnded = () => {
        setPlaying(false);
        playDefaultLottieRef.current.stop();
    }

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadeddata', handleLoadData);
        audio.addEventListener('ended', handleEnded);
        playDefaultLottieRef.current.goToAndStop(1, true);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadeddata', handleLoadData);
            audio.removeEventListener('ended', handleEnded);
        }
    }, []);

    return (
        <div className="audio-player-container" id="audio-player-container">
            <audio ref={audioRef} src={src} preload="metadata" />
            <button className="play-icon" onClick={togglePlayPause}>
                <Lottie lottieRef={playDefaultLottieRef} animationData={playAnimationData} loop={false} autoplay={false} />
            </button>
            <div className="time" id="current-time">{calculateTime(currentTime)}</div>
            <input type="range" className="seek-slider" max={duration} value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
            <div className="time" id="duration">{calculateTime(duration)}</div>
        </div>
    );
}