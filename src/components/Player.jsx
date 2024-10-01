import { useState } from "react";

export default function Player({initialName, symbol, isActive, onUpdateName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setisEditing] = useState(false);

    function handleEditClick(){
        setisEditing((editing) => !editing);
        if(isEditing){
            onUpdateName(symbol, playerName);
        }
    }

    function handleInputChange(event){
        setPlayerName(event.target.value);
    }

    return( 
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input type="text" required value={playerName} onChange={handleInputChange}/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}