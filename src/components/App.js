import '../styles/App.css';
import shipFactory from './shipFactory';
import gameboardFactory from './gameboardFactory';

function App() {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.receiveAttack('b', 1);
  console.log(gameBoard);
  return (
    <div className="App">
    </div>
  );
}

export default App;
