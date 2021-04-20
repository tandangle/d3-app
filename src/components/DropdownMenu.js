import React, {useContext} from "react";
import { PlayerContext } from "./PlayerContext"

function DropdownMenu(props) {

    const playerContextObject = useContext(PlayerContext);

    const changePlayer = (e) => {
        playerContextObject.togglePlayer(e.target.value)
    }

    return (
        <PlayerContext.Consumer>
           {() => (
            <select onChange={changePlayer} className="dropdownMenu">
                {props.players.map(p => (
                p.Player_Code === props.player ?                 
                <option
                selected="selected"
                value={p.Player_Code}
                key={p.Player_Code}
                >{p.Player}</option> 
                :
                <option
                value={p.Player_Code}
                key={p.Player_Code}
                >{p.Player}</option>
                ))}
            </select>
           )}
        </PlayerContext.Consumer>
     
    );
  }
  
  export default DropdownMenu;
  