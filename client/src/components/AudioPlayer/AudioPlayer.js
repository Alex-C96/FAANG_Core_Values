import React, { useEffect, useRef, useState } from "react";
import './AudioPlayer.css';
import PlayIcon from './PlayIcon';
import PauseIcon from './PauseIcon';

export default function AudioPlayer({ src }) {

    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackDuration, setTrackDuration] = useState(0);

    const audioRef = useRef(null);
    const intervalRef = useRef();
    const isReady = useRef(false);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };

    const onPlayPauseClick = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        audioRef.current = new Audio(src);
    }, [src]);

    useEffect(() => {
        audioRef.current.addEventListener('loadedmetadata', () => {
            setTrackDuration(audioRef.current.duration);
        });
    }, []);

    useEffect(() => {
        if (isPlaying) {
          console.log("Attempting to play audio...");
          audioRef.current.play().then(() => {
            console.log("Audio is playing!");
          }).catch(error => {
            console.error("Error playing audio: ", error);
          });
          startTimer();
        } else {
          console.log("Pausing audio...");
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }, [isPlaying]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    })

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 100);
    }

    const onScrub = (value) => {
        // Clear any timers already running
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
    }
    
    const onScrubEnd = () => {
      // If not already playing, start
      if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
    }

    return (
        <div className="card w-96 bg-primary mb-5 shadow-xl">
            <div className="card-body flex flex-row">
                <audio ref={audioRef} src={src} preload="metadata" />
                <label className="basis-1/4 swap swap-rotate" >
                    <input type="checkbox" onClick={() => onPlayPauseClick()}/>
                    <PlayIcon />
                    <PauseIcon />
                </label>
                <div className="time basis-1/4" id="current-time">{calculateTime(trackDuration)}</div>
                <input 
                    type="range" 
                    className="range range-accent basis-1/2"
                    step="1" 
                    min="0"
                    max={trackDuration || 0} 
                    value={trackProgress} 
                    onChange={(e) => onScrub(e.target.value)} 
                    onKeyUp={onScrubEnd} 
                    onMouseUp={onScrubEnd} 
                />
                <div className="time basis-1/4" id="duration">{calculateTime(trackDuration)}</div>
            </div>
        </div>
    );
}