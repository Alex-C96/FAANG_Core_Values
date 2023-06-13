import React, { useEffect, useRef, useState } from "react";
import './AudioPlayer.css';
import PlayIcon from './PlayIcon';
import PauseIcon from './PauseIcon';

export default function AudioPlayer({ src }) {
    const audioRef = useRef();
    const checkboxRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };

    const onPlayPauseClick = () => {
        setIsPlaying(!isPlaying);
    }

    const handleLoadData = () => {
        setDuration(audioRef.current.duration);
    }

    const handleEnded = () => {
        setPlaying(false);
        checkboxRef.current.checked = false;
    }

    const handleMouseDown = () => {
        if (playing) {
            audioRef.current.pause();
        }
    };

    const handleMouseUp = () => {
        if (playing) {
            audioRef.current.play();
        }
    }

    const handleChange = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

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
                    <input ref={checkboxRef} type="checkbox" onClick={togglePlayPause}/>
                    <PlayIcon />
                    <PauseIcon />
                </label>
                <div className="time basis-1/4" id="current-time">{calculateTime(currentTime)}</div>
                <input type="range" className="range range-secondary basis-1/2" min={0} max={Math.floor(duration)} value={Math.floor(currentTime)} onChange={handleChange} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
                <div className="time basis-1/4" id="duration">{calculateTime(duration)}</div>
            </div>
        </div>
    );
}