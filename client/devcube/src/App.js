// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js';
import MDEditor from './components/markdown.js';

function App() {
  return (
    <div className="App">

      <Navbar />
      <MDEditor />

    </div >
  );
}

export default App;