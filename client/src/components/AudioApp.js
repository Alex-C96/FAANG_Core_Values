import { useState, useEffect } from 'react';
import InputForm from './InputForm';
import AudioList from './AudioList';

function AudioApp() {
    const [audios, setAudios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/audios')
            .then(response => response.json())
            .then(data => setAudios(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    
    const handleFormSubmit = (input) => {
        fetch('http://localhost:3001/submit-form', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              data: input
          }),
        })
        .then(response => response.json())
        .then(data => {
          const audioFile = data.audioFile;
          const url = `http://localhost:3001/public/${audioFile}`;
          const newAudio = { id: audios.length + 1, src: url, text: input };
          setAudios([...audios, newAudio]);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    };

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="basis-1/2 px-8 py-8 mt-8">
                <InputForm onFormSubmit={handleFormSubmit} />
            </div>
            <div className="basis-1/2 px-8 py-8 mt-8">
                <AudioList audios={audios} />
            </div>         
        </div>
    );
}

export default AudioApp;