import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let currPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){ //the first is always the latest player
    currPlayer = 'O'// if the prev turn was X so currently it's O
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns){
	let gameBoard = [...INITIAL_GAME_BOARD.map((array => [...array] ))];

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
	return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquarSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquarSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquarSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquarSymbol && 
      (firstSquarSymbol === secondSquarSymbol)
      && (firstSquarSymbol === thirdSquarSymbol)){
        winner = players[firstSquarSymbol];
      }
  }
	return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns)
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);

  function handleSelectSquare(rowIndex, colIndex){
      setGameTurns(prevTurns => {
      deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleNewGame(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      const newPlayers = {
        ...prevPlayers,
        [symbol] : newName 
      };
      return newPlayers;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onUpdateName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onUpdateName={handlePlayerNameChange}
          />
        </ol>
        {(winner || gameTurns.length === 9) && <GameOver winner={winner} onSelectNewMatch={handleNewGame}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
