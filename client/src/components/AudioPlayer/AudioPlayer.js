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
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body flex flex-row">
                <audio ref={audioRef} src={src} preload="metadata" />
                <button className="play-icon basis-1/4" onClick={togglePlayPause}>
                    <Lottie lottieRef={playDefaultLottieRef} animationData={playAnimationData} loop={false} autoplay={false} />
                </button>
                <div className="time basis-1/4" id="current-time">{calculateTime(currentTime)}</div>
                <input type="range" className="range basis-1/2" max={duration} value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
                <div className="time basis-1/4" id="duration">{calculateTime(duration)}</div>
            </div>
        </div>
    );
}