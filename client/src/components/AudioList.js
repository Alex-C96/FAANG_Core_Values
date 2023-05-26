import AudioPlayer from "./AudioPlayer";

function AudioList({audios}) {

    return (
        <div className="audio-list">
            {audios.map((audio) => (
            <div className="audio-element" key={audio.id}>
                <AudioPlayer src={audio.src} />
                <a href={audio.src}>Download audio</a>
            </div>
            ))}
        </div>
    )
}

export default AudioList;