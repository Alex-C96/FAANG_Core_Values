import AudioPlayer from "./AudioPlayer/AudioPlayer";

function AudioList({audios}) {

    return (
        <div className="audio-list flex flex-col justify-center items-center">
            {audios.map((audio) => (
            <div className="audio-element flex-initial" key={audio.id}>
                <AudioPlayer src={audio.src} />
            </div>
            ))}
        </div>
    )
}

export default AudioList;