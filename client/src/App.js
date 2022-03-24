import './App.css';
import Login from './components/login.js';
import NavBar from './components/navbar.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> ATM SYSTEM PROJECT </h1>
        <NavBar />
      </header>
      <body className="App-body">
          <Login />
      </body>
    </div>
  );
}

export default App;
