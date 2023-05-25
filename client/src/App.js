import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';
import AudioPlayer from './components/AudioPlayer';
import AudioList from './components/AudioList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Text to Speech Translator</h1>
        <InputForm/>
        
        <AudioList />
      </header>
    </div>
  );
}

export default App;
