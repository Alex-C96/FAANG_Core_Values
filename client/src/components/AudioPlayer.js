import {useEffect, useState, useRef} from 'react';

function AudioPlayer({ src }) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef();

    useEffect(() => {
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    },
    [playing]);

    return (
        <div>
            <audio ref={audioRef} controls>
                <source src={src} type="audio/mpeg" />
            </audio>
        </div>
    );
}

export default AudioPlayer;