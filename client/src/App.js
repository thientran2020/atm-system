import './App.css';
import Login from './components/login.js';
import NavBar from './components/navbar.js';
import Foot from './components/footer.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> ATM SYSTEM PROJECT </h1>
      
      </header>
        <NavBar />
      <body className="App-body">
          <Login />
      </body>
      {/* importing footer from componets module  */}
      
      <footer>
  <Foot />
 
</footer> 
    </div>
  );
}

export default App;
