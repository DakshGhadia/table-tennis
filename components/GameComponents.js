'use client';
import PlayerContainer from "./PlayerContainer";
import { useState, useEffect } from "react";
import ResetButton from "@/components/ResetButton";
import PlayingTo from "./PlayingTo";
import Customization from "./Customization";
import ServiceChangeModal from "./ServiceChangeModal";

export default function GameComponents(){
    const [resetCounter,setResetCounter] = useState(0);
    const [playingTo,setPlayingTo] = useState(0);
    const [player1Name,setPlayer1Name] = useState("");
    const [player2Name,setPlayer2Name] = useState("");
    const [winBy2, setWinBy2] = useState(true);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [serviceChange, setServiceChange] = useState(2);
    const [showServiceChangeModal, setShowServiceChangeModal] = useState(false);
    const [pointsSinceLastServiceChange, setPointsSinceLastServiceChange] = useState(0);


    function handleReset() {
      setResetCounter((prev)=>prev+1);
      setPlayer1Score(0);
      setPlayer2Score(0);
      setPointsSinceLastServiceChange(0);
    }

    function changePlayingto(value){
      setPlayingTo(value)
    }

    function increasePlayerScore(player) {
      if (player === 1) {
          setPlayer1Score((prev) => prev + 1);
      } else if (player === 2) {
          setPlayer2Score((prev) => prev + 1);
      }

      setPointsSinceLastServiceChange((prev) => prev + 1);
  }

  function decreasePlayerScore(player) {
      if (player === 1) {
          setPlayer1Score((prev) => Math.max(prev - 1, 0));
      } else if (player === 2) {
          setPlayer2Score((prev) => Math.max(prev - 1, 0));
      }
      setPointsSinceLastServiceChange((prev) => Math.max(prev - 1,0));
  }

  useEffect(() => {
    if(winBy2) {
      if(player1Score>=playingTo-1 && player2Score>=playingTo-1 && pointsSinceLastServiceChange==1 && Math.abs(player1Score-player2Score)<2) {
        setShowServiceChangeModal(true);
        setPointsSinceLastServiceChange(0); 
      }
      else if (pointsSinceLastServiceChange >= serviceChange && (player1Score != playingTo && player2Score != playingTo)) {
        setShowServiceChangeModal(true);
        setPointsSinceLastServiceChange(0); 
      }
    }
    else if (pointsSinceLastServiceChange >= serviceChange && (player1Score != playingTo && player2Score != playingTo)) {
      setShowServiceChangeModal(true);
      setPointsSinceLastServiceChange(0); 
    }
  }, [pointsSinceLastServiceChange, serviceChange,player1Score,player2Score,playingTo,winBy2]);

    return (
      <> 
      <PlayingTo resetCounter = {resetCounter} onChangeValue={changePlayingto}/>
      <div className="flex mt-5 justify-center items-center gap-x-10 lg:gap-x-36">
        <PlayerContainer 
          winBy2= {winBy2} 
          playerScore={player1Score}
          opponentScore={player2Score}
          increaseScore={() => increasePlayerScore(1)}
          decreaseScore={() => decreasePlayerScore(1)} 
          setPlayerName = {setPlayer1Name} 
          wonReset = {handleReset} 
          playingTo={playingTo} 
          resetCounter={resetCounter}/>

        <PlayerContainer 
          winBy2= {winBy2}
          playerScore={player2Score}
          opponentScore={player1Score}
          increaseScore={() => increasePlayerScore(2)}
          decreaseScore={() => decreasePlayerScore(2)}  
          setPlayerName = {setPlayer2Name}
          wonReset = {handleReset} 
          playingTo={playingTo} 
          resetCounter={resetCounter} />
      </div>
      <ResetButton onPressed={handleReset}/>
      <Customization playingTo={playingTo} setServiceChange = {setServiceChange} setWinBy2 = {setWinBy2} player1Name = {player1Name} player2Name = {player2Name} />
      <ServiceChangeModal show={showServiceChangeModal} onPress={() => setShowServiceChangeModal(false)} />

      </>
    
    );
}