import React from 'react';
import playerIcon from '../images/playerIcon.svg';
import robotIcon from '../images/robotIcon.svg';

const PlayerSelection = (props) => {
  let player2Icon = '';
  let computerIcon = '';
  
  if (props.player2Type === 'player') {
    player2Icon =
    <img 
      className="yep playerIcon selectorIcon opponentSelected" 
      src={playerIcon}
    >
    </img>;
    
    computerIcon = 
    <img 
      className="robotIcon selectorIcon opponentUnselected" 
      src={robotIcon}
    >
    </img>;
  }

  if (props.player2Type === 'computer') {
    player2Icon =
    <img 
      className="playerIcon selectorIcon opponentUnselected" 
      src={playerIcon}
    >
    </img>;
  
    computerIcon =
    <img 
      className="robotIcon selectorIcon opponentSelected" 
      src={robotIcon}
    >
    </img>;
  }
  
  return (
    <div className="opponentSelectionDiv">
      <div className="player1SelectionDiv">
        <img 
          className="playerIcon opponentSelected selectorIcon" 
          src={playerIcon}>
        </img>
      </div>
      <p className="versusText">vs.</p>
      <div className="player2SelectionDiv">
        <div 
          className="humanSelection" 
          onClick={props.changeOpponentType.bind(this, 'player')}
        >
          {player2Icon}
        </div>
        
        <div 
          className="computerSelection" 
          onClick={props.changeOpponentType.bind(this, 'computer')}
        >
          {computerIcon}
        </div>
      </div>
    </div>
  );
}

export default PlayerSelection