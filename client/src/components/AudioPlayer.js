import {useEffect, useState} from 'react';
import soundFile from 'C:/Users/alexa/projects/faang_core_values/client/src/YourAudioFile.wav';

function AudioPlayer() {
    const [audio] = useState(new Audio(soundFile));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
    [playing]);

    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    );
}

export default AudioPlayer;