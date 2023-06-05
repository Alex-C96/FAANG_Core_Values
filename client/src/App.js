import logo from './logo.svg';
import './App.css';
import AudioApp from './components/AudioApp';

function App() {
  return (
    <div className="App">
      <div className="navbar bg-secondary">
        <a className="btn btn-ghost normal-case text-xl">Text to Speech Translator</a>
      </div>
      <AudioApp/>
    </div>
  );
}

export default App;
