import React from "react";

function PlayerInfo(props) {

    return (
        props.player ? 
            <div className="playerInfo">
                <img className="playerImage" alt={"Player portrait of " + props.salaries.find(e => e.Player_Code === props.player)?.Player } src={"https://www.basketball-reference.com/req/202104152/images/players/" + props.player + ".jpg"}/>
                <div className="playerHeader">
                    <div className="playerName">
                        Player Name: {props.salaries.find(e => e.Player_Code === props.player)?.Player}
                    </div>
                    <div className="playerTeam">
                        Team: {props.teams[props.salaries.find(e => e.Player_Code === props.player)?.Tm]}
                    </div>
                    <div className="playerDraft">
                    {props.draft.find(e => e.Player_Code === props.player) ? "Draft Class of " + props.draft.find(e => e.Player_Code === props.player)?.Year + " - Round " + props.draft.find(e => e.Player_Code === props.player)?.Rd+ ", Pick " + props.draft.find(e => e.Player_Code === props.player)?.Pk + " by the " + props.teams[props.draft.find(e => e.Player_Code === props.player)?.Tm] : "Undrafted" }
                    </div>
                </div>
                <div className="playerStats">
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
               <div className="playerLinks">
                    <div className="playerLink">
                        <a href={"https://www.basketball-reference.com/players/" + props.player.slice(0,1) + "/" + props.player + ".html"} target="_blank" rel="noreferrer">Link to {props.salaries.find(e => e.Player_Code === props.player)?.Player}'s Basketball Reference page</a>
                    </div>
                    <div className="playerYoutube">
                        <a href={"https://www.youtube.com/results?search_query=" + props.salaries.find(e => e.Player_Code === props.player)?.Player.split(" ")[0] + "+" + props.salaries.find(e => e.Player_Code === props.player)?.Player.split(" ")[1] + "highlights"} target="_blank" rel="noreferrer">Link to {props.salaries.find(e => e.Player_Code === props.player)?.Player}'s Highlights on Youtube</a>
                    </div>
               </div>
               
            </div> : <div className="playerInfo"></div>
    );
  }
  
  export default PlayerInfo;