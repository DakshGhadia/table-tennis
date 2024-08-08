'use client';
import PlayerContainer from "./PlayerContainer";
import { useState } from "react";
import ResetButton from "@/components/ResetButton";
import PlayingTo from "./PlayingTo";

export default function GameComponents(){
    const [resetCounter,setResetCounter] = useState(0);
    const [playingTo,setPlayingTo] = useState(0);

    function handleReset() {
      setResetCounter((prev)=>prev+1);
    }

    function changePlayingto(value){
      setPlayingTo(value)
    }
    return (
      <> 
      <PlayingTo resetCounter = {resetCounter} onChangeValue={changePlayingto}/>
      <div className="flex mt-5 justify-center items-center gap-x-20">
        <PlayerContainer wonReset = {handleReset} playingTo={playingTo} resetCounter={resetCounter}/>
        <PlayerContainer wonReset = {handleReset} playingTo={playingTo} resetCounter={resetCounter} />
      </div>
      <ResetButton onPressed={handleReset}/>
      </>
    
    );
}