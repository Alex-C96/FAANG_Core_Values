import AudioPlayer from "./AudioPlayer/AudioPlayer";

function AudioList({audios}) {

    return (
        <div className="audio-list">
            {audios.map((audio) => (
            <div className="audio-element" key={audio.id}>
                <AudioPlayer src={audio.src} />
            </div>
            ))}
        </div>
    )
}

export default AudioList;