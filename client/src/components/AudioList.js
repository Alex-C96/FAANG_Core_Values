import AudioPlayer from "./AudioPlayer/AudioPlayer";

function AudioList({audios, fetchFiles}) {

    const deleteFile = (file) => {
        fetch('http://localhost:3001/deletefile', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({filename: file}),
        })
        .then((res) => {
            if (res.ok) {
                fetchFiles();
                console.log(res.text());
            } else {
                console.log("failed to delete file");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="audio-list flex flex-col justify-center items-center">
            {audios.map((audio) => (
            <div className="audio-element flex-initial" key={audio.id}>
                <AudioPlayer src={audio.src} onDelete={() => deleteFile(audio.filename)} />
            </div>
            ))}
        </div>
    )
}

export default AudioList;