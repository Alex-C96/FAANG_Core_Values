import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Text to Speech Translator</p>
        <InputForm/>
        <AudioPlayer />
      </header>
    </div>
  );
}

export default App;
