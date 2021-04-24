import React, {useState, useEffect} from 'react';
import playerFactory from './playerFactory';
import PlayerSelection from './PlayerSelection';
import carrier from '../images/carrier.svg';
import battleship from '../images/battleship.svg';
import cruiser from '../images/cruiser.svg';
import submarine from '../images/submarine.svg';
import patrolboat from '../images/patrolboat.svg';

const GamePage = () => {
  const [player2Type, setPlayer2Type] = useState('computer');
  const [displayBoard, setDisplayBoard] = useState([]);
  const [opponentDisplayBoard, setOpponentDisplayBoard] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  
  const testDiv = <div className="testDiv"></div>
  const [gameContent, setGameContent] = useState(testDiv);
  
  const generatePlayers = () => {
    const generatedPlayers = playerFactory();
    setAllPlayers(generatedPlayers);
    loadPlaceShips(generatedPlayers);
  }

  const onDrag = (event) => {
    console.log(event);
  }
  
  const dragOver = (column, row, event) => {
    event.preventDefault();
    console.log(event);
    console.log(column, row);
  }

  const loadPlaceShips = (allPlayers) => {
    console.log(allPlayers);
    const emptySquare = 
      <div 
        className={'boardSquare emptySquare infoSquare'}
        key='empty'
      >
      </div>
    displayBoard.push(emptySquare);

    for (let i = 1; i <= 10; i++) {
      const rowInfoSquare = 
      <div 
        className={'boardSquare infoSquare'}
        key={i}
        row={i}
      >
        <h1 className="rowInfoNumber infoChar">{i}</h1>
      </div>
      displayBoard.push(rowInfoSquare);
    }

    //Generates the JSX for the display board and updates the state
    Object.keys(allPlayers.player1.gameBoard.squares).forEach((column) => {
      const columnInfoSquare = 
        <div 
          className={'boardSquare infoSquare'}
          key={column}
          column={column}
        >
          <h1 className="columnInfoLetter infoChar">{column}</h1>
        </div>
      displayBoard.push(columnInfoSquare);
      Object.keys(allPlayers.player1.gameBoard.squares[column]).forEach((row) => {
        

        const square = 
        <div 
          className={`boardSquare column-${column} row-${row}`}
          key={column + row}
          column={column}
          row={row}
          onDragOver={dragOver.bind(this, column, row)}
        >
        </div>
        
        setDisplayBoard(displayBoard.push(square));
      });
    });

    setGameContent(buildScreen);
  }
  
  const startGame = () => {
    console.log('hello');

    

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

    <div className="startButton" onClick={generatePlayers}>
      <h1 className="buttonText">Start Game</h1>
    </div>
  </div>;
  useEffect(() => {
    setGameContent(homeScreen);
  },  [player2Type]); 
  
  const buildScreen =
  <div className="buildScreen">
    <div className="shipSelector"> 
      <img 
        className="ship cruiser" 
        src={cruiser} 
        draggable
        onDrag={onDrag}
      >
      </img>
      <img 
        className="ship battleship" 
        src={battleship} 
        draggable
        onDrag={onDrag}
        >
      </img>
      <img 
        className="ship carrier" 
        src={carrier} 
        draggable
        onDrag={onDrag}
        >
      </img>
      <img 
        className="ship submarine" 
        src={submarine} 
        draggable
        onDrag={onDrag}
        >
      </img>
      <img 
        className="ship patrolboat" 
        src={patrolboat} 
        draggable
        onDrag={onDrag}
        >
      </img>
    </div>
    
    <div className="displayBoard">
      {displayBoard}
    </div>
  </div>

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