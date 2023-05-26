import logo from './logo.svg';
import './App.css';
import AudioApp from './components/AudioApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Text to Speech Translator</h1>
        <AudioApp/>
      </header>
    </div>
  );
}

export default App;
