

function AudioList() {

    const audios = [
        {
          id: 1,
          src: "/media/cc0-audio/t-rex-roar.mp3",
          text: "T-Rex roar"
        },
        {
          id: 2,
          src: "/media/cc0-audio/lion-roar.mp3",
          text: "Lion roar"
        },
      ];

    return (
        <div className="audio-list">
            {audios.map((audio) => (
            <div className="audio-element" key={audio.id}>
                <audio controls>
                <source src={audio.src} type="audio/mpeg" />
                <a href={audio.src}>
                    Download audio
                </a>
                </audio>
                <p>{audio.text}</p>
            </div>
            ))}
        </div>
    )
}

export default AudioList;