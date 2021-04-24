import React, {useState, useEffect} from 'react';
import playerFactory from './playerFactory';
import PlayerSelection from './PlayerSelection';

const GamePage = () => {
  const [player2Type, setPlayer2Type] = useState('computer');
  const [displayBoard, setDisplayBoard] = useState([]);
  const [opponentDisplayBoard, setOpponentDisplayBoard] = useState([]);
  
  const testDiv = <div className="testDiv"></div>
  const [gameContent, setGameContent] = useState(testDiv);
  
  const startGame = () => {
    console.log('hello');
    const allPlayers = playerFactory();

    //Generates the JSX for the display board and updates the state
    Object.keys(allPlayers.player1.gameBoard.squares).forEach((column) => {
      Object.keys(allPlayers.player1.gameBoard.squares[column]).forEach((row) => {
        // console.log(allPlayers.player1.gameBoard.squares[column][row]);
        const square = 
        <div 
          className={`boardSquare column-${column} row-${row}`}
          key={column + row}
          column={column}
          row={row}
        >
        </div>
        setDisplayBoard(displayBoard.push(square));
      });
    });

    //Generates the JSX for the opponent's display board and updates the state
    Object.keys(allPlayers.player1.gameBoard.squares).forEach((column) => {
      Object.keys(allPlayers.player1.gameBoard.squares[column]).forEach((row) => {
        // console.log(allPlayers.player1.gameBoard.squares[column][row]);
        const square = 
        <div 
          className={`boardSquare column-${column} row-${row}`}
          key={column + row}
          column={column}
          row={row}
        >
        </div>
        setOpponentDisplayBoard(opponentDisplayBoard.push(square));
      });
    });

    setGameContent(gameScreen);
    console.log(displayBoard);
  }

  const changeOpponentType = (sentType) => {
    if (sentType !== player2Type) {
      setPlayer2Type(sentType);
    }
    
  }
  
  const homeScreen =
  <div className="homeScreen">
    <h1 className="gameTitle">Battleship!</h1>
    
    <PlayerSelection changeOpponentType={changeOpponentType.bind(this)} player2Type={player2Type}/>

    <div className="startButton" onClick={startGame}>
      <h1 className="buttonText">Start Game</h1>
    </div>
  </div>;
  useEffect(() => {
    setGameContent(homeScreen);
  },  [player2Type]); 
  
  
  const gameScreen =
  <div className="gameScreen">
    <h1>Opponent's Board:</h1>
    <div className="displayBoard">
      {opponentDisplayBoard}
    </div>
    
    <h1>Your Board:</h1>
    <div className="displayBoard">
      {displayBoard}
    </div>
  </div>

  
  return (
    <div className="content">
      {gameContent}
    </div>
  );
};

export default GamePage;