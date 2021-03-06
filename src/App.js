import { useState } from "react";
import Graph from "./components/Graph";
import DropdownMenu from "./components/DropdownMenu"
import PlayerInfo from "./components/PlayerInfo"
import { PlayerContext } from "./components/PlayerContext"
import './App.css';
import nba_salaries from "./json/nba_salaries"
import nba_draft from "./json/nba_draft"
import nba_stats from "./json/nba_stats"
import nba_teams from "./json/nba_teams"

function App() {

  const [player, setPlayer] = useState("")

  
  const togglePlayer = (e) => {
    setPlayer(e)
  }

  return (
    <PlayerContext.Provider value={{player: player, togglePlayer: togglePlayer}}>
      <div className="bpm">
          <div>
          Box Plus/Minus, Version 2.0 (BPM) is a basketball box score-based metric that estimates a basketball player’s contribution to the team when that player is on the court. It is based only on the information in the traditional basketball box score--no play-by-play data or non-traditional box score data (like dunks or deflections) are included.
          </div>
          <div>
          BPM uses a player’s box score information, position, and the team’s overall performance to estimate the player’s contribution in points above league average per 100 possessions played. BPM does not take into account playing time -- it is purely a rate stat!
          </div>
          <div>
          To give a sense of the scale:
          <ol>
            <li>+10.0 is an all-time season (think peak Jordan or LeBron)</li>
            <li>+8.0 is an MVP season (think peak Dirk or peak Shaq)</li>
            <li>+6.0 is an all-NBA season</li>
            <li> +4.0 is in all-star consideration</li>
            <li>+2.0 is a good starter</li>
            <li> +0.0 is a decent starter or solid 6th man</li>
            <li>-2.0 is a bench player (this is also defined as "replacement level")</li>
            <li>Below -2.0 are many end-of-bench players</li>
          </ol>
          <div>
          This site was put together to visualize the currently active NBA players' BPM against their salary to analyze if there's any correlation between them.
          </div>
          <div>
          Click on any data point on the graph or select a player from the dropdown menu to get started!
          </div>
          
          </div>
        </div>
      <div className="graphContainer">
      <PlayerInfo player={player} salaries={nba_salaries} stats={nba_stats} teams={nba_teams} draft={nba_draft}/>
      <Graph salaries={nba_salaries} stats={nba_stats} player={player} togglePlayer={togglePlayer}/>
      </div>
      <DropdownMenu players={nba_salaries} player={player}/>
    </PlayerContext.Provider>
  );
}

export default App;
