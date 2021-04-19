import React, {useRef, useEffect, useStat, useContext} from "react";
import { PlayerContext } from "./PlayerContext";

function PlayerInfo(props) {

    return (
        props.player &&  
            <div className="playerInfo">
                <img className="playerImage" src={"https://www.basketball-reference.com/req/202104152/images/players/" + props.player + ".jpg"}/>
                <div className="playerName">
                    Player Name: {props.salaries.find(e => e.Player_Code === props.player)?.Player}
                </div>
                <div className="playerTeam">
                    Team: {props.teams[props.salaries.find(e => e.Player_Code === props.player)?.Tm]}
                </div>
                <div className="playerBox">
                    Box Plus Minus: {props.stats.find(e => e.Player_Code === props.player)?.BPM ? props.stats.find(e => e.Player_Code === props.player)?.BPM : "No BPM stat found"}
                </div>
                <div className="playerSalary">
                    2021 - 2022 Salary: ${props.salaries.find(e => e.Player_Code === props.player)?.current_salary.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="bpmPerMillion">
                {props.stats.find(e => e.Player_Code === props.player)?.BPM && props.salaries.find(e => e.Player_Code === props.player)?.current_salary ? 
                "Cost per 1 BPM: $"  + (props.salaries.find(e => e.Player_Code === props.player)?.current_salary / props.stats.find(e => e.Player_Code === props.player)?.BPM).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  : 
                "Insufficient stats available to calculate cost per BPM"}
                </div>
            </div>
    );
  }
  
  export default PlayerInfo;