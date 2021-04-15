import '../styles/App.css';
import shipFactory from './shipFactory';
import gameboardFactory from './gameboardFactory';

function App() {
  const gameBoard = gameboardFactory();
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
