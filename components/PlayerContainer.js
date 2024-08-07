"use client";
import { useState, useEffect } from "react";
import PlayingToNotSetModal from "./PlayingToNotSetModal";
import WonModal from "./WonModal";
export default function PlayerContainer({ resetCounter, playingTo, wonReset }) {
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [won,setWon] = useState(false);
  const [name,setName] = useState();
  useEffect(() => {
    setWon(false);
    setScore(0);
  }, [resetCounter]);

  function increaseScore() {
    setScore((score) => score + 1);
  }

  useEffect(() => {
    if(Number(score)===Number(playingTo) && Number(score) != 0){
      setWon(true);
    }
  }, [score,playingTo]);

  function decreaseScore() {
    setScore((score) => {
      if (score > 0) {
        return score - 1;
      }
      return 0;
    });
  }

  function toggleModal() {
    setShowModal(true);
  }

  function handleClose(){
    setShowModal(false);
  }

  function handleChangeName(event){
    setName(event.target.value);
  }

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-amber-200 rounded-md flex flex-col items-center">
      <input
        type="text"
        value = {name}
        className="bg-transparent border-none w-full text-center mt-2 placeholder-black text-sm sm:text-base"
        placeholder = "Enter your name here"
        onChange={handleChangeName}

      />
      <button
        className="w-3/4 aspect-square mt-4 bg-white flex rounded-xl justify-center items-center text-4xl sm:text-6xl md:text-8xl font-bold"
        onClick={() => (playingTo == 0 || isNaN(playingTo)) ? toggleModal() : increaseScore()}

      >
        {score}
      </button>
      <div>
        <button onClick={decreaseScore} className="mt-3 bg-blue-500 rounded-lg">
          <p className="text-xl sm:text-2xl md:text-3xl">↓</p>
        </button>
      </div>
      {showModal && <PlayingToNotSetModal onPress={handleClose} />}
      {won && <WonModal onPressed={wonReset} playerWon = {name}/>}
    </div>
  );
}