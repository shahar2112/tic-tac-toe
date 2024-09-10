export default function GameOver({winner, onSelectNewMatch}){
    return (
    <div id='game-over'>
        <h2>Game Over!</h2>
        {winner && <p>{winner} won! </p>}
        {!winner && <p>It's a draw</p>}
        <p>
            <button onClick={onSelectNewMatch}>Play Again!</button>
        </p>
    </div>
    );
}