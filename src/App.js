import './App.css';

import { useState } from 'react';




function App() {
  const rcost = 4;
  const bcost = 8;
  
  //Is this okay?
  const [pammo, setpammo] = useState(0);
  const [oammo, setoammo] = useState(0);
  const [round, setround] = useState(1);

  const [paction, setpaction] = useState("");
  const [poaction, setpoaction] = useState("");
  const [endText, setEndText] = useState("");
  const [gameOn, setgameOn] = useState(false);

  function reset(){
    setpammo(0);
    setoammo(0);
    setround(1);
    setpaction("");
    setpoaction("");
    setEndText("");
    setgameOn(true);
  }

  function actionClick(action) {
    console.log('clicked '+action+'!');
    
    let oaction = chooseEnemyAction(pammo, oammo);
    console.log(oaction);
    roundLogic(action,oaction, pammo, oammo, setpammo, setoammo);
    setpaction(action);
    setpoaction(oaction);
    setround(round+1);
  }

  function roundLogic(action,oaction){
    if (action == "Load"){
      setpammo(pammo+1);
    }
    else if (action == "Shoot"){
      setpammo(pammo-1);
    }
    else if (action == "Reflect"){
      setpammo(pammo-rcost);
    }
    else if (action == "Bazooka"){
      setpammo(pammo-bcost);
    }

    if (oaction == "Load"){
      setoammo(oammo+1);
    }
    else if (oaction == "Shoot"){
      setoammo(oammo-1);
    }
    else if (oaction == "Reflect"){
      setoammo(oammo-rcost);
    }
    else if (oaction == "Bazooka"){
      setoammo(oammo-bcost);
    }

    if((action==="Load" && oaction==="Shoot") ||
      (action!=="Reflect" && oaction==="Bazooka") ||
      ((action==="Shoot" || action==="Bazooka") && oaction==="Reflect")){
        console.log("Lose");
        setEndText("You Lose!");
        setgameOn(false);
    }
    if((oaction==="Load" && action==="Shoot") ||
      (oaction!=="Reflect" && action==="Bazooka") ||
      ((oaction==="Shoot" || oaction==="Bazooka") && action==="Reflect")){
        console.log("Win");
        setEndText("You Win!");
        setgameOn(false);
    }
  }

  return (
    <div className="center">
      <div className="Title">
        <h1>007 Game</h1>
      </div>

      <br/>

      <button onClick={reset}>Start Game</button>

      <br/>
      <br/>
      <div className="RoundEvent">
        <p>You used {paction}. Opponent used {poaction}. {endText}</p>
        <p>Turn {round}</p>
      </div>

      <div className="Resources">
        <p>Player ammo: {pammo} | Opponent ammo: {oammo}</p>
      </div>


      {gameOn &&
      <div className="ActionsButtons">
        <div className="flex-container1">
          <ActionButton label="Load" action="Load" onClick={actionClick} disablecond={false}/>
          <ActionButton label="Shoot" action="Shoot" onClick={actionClick} disablecond={(pammo === 0)} />
          <ActionButton label="Block" action="Block" onClick={actionClick} disablecond={false}/>
        </div>
        <div className="flex-container2">
          <ActionButton label={`Reflect (Costs ${rcost})`} action="Reflect" onClick={actionClick} disablecond={(pammo < rcost)}/>
          <ActionButton label={`Bazooka (Costs ${bcost})`} action="Bazooka" onClick={actionClick} disablecond={(pammo < bcost)}/>
        </div>
      </div>
      }

    </div>
  );
}

//react component
function ActionButton({ label, action, onClick, disablecond }) {
  return (
    <button
      className="Action"
      onClick={ () => onClick(action) }
      disabled = {disablecond}
    >
      {label}
    </button>
  );
}

function chooseEnemyAction(pammo, oammo){
  let movelist = ["Load"];
  if (pammo>0){
    movelist.push("Block");
  }
  if (oammo>0){
    movelist.push("Shoot");
  }
  if (oammo>=4 && pammo>0){
    movelist.push("Reflect");
  }
  if (oammo>=8){
    movelist.push("Bazooka");
  }
  console.log("movelist:"+movelist);
  let chosenAction = movelist[Math.floor(Math.random() * movelist.length)];
  return chosenAction;

}



export default App;
