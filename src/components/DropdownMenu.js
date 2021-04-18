import React, {useRef, useEffect, useStat, useContext} from "react";
import { PlayerContext } from "./PlayerContext"

function DropdownMenu(props) {

    const playerContextObject = useContext(PlayerContext);
    console.log(playerContextObject)

    const changePlayer = (e) => {
        playerContextObject.togglePlayer(e.target.value)
    }

    return (
        <PlayerContext.Consumer>
           {({player, togglePlayer}) => (
            <select onChange={changePlayer} className="dropdownMenu">
                {props.players.map(p => (
                <option
                value={p.Player}
                key={p.Player_Code}
                >{p.Player}</option>
                ))}
            </select>
           )}
        </PlayerContext.Consumer>
     
    );
  }
  
  export default DropdownMenu;
  