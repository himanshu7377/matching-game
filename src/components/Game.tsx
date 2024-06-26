import React, { useRef, useState } from "react";
import blueCard from "../images/blue-card.svg";
import redCard from "../images/redCard.svg";
import "./Game.css";

import arrowTop from "../images/arrpw-top.svg";
import arrowBottom from "../images/arrow-bottom.svg";
import nextButton from "../images/next-button.svg";
import match from "../images/match.svg";
import Loader from "./Loader";



type Props = { setScreen: any };

const redCardData = [
  { fruit: "apple", icon: "🍎" },
  { fruit: "orange", icon: "🍊" },
  { fruit: "grape", icon: "🍇" },
  { fruit: "banana", icon: "🍌" },
  { fruit: "mango", icon: "🥭" },
  { fruit: "pineapple", icon: "🍍" },
];

const blueCardData = [
  { fruit: "orange", icon: "🍊", letter: "O" },
  { fruit: "apple", icon: "🍎", letter: "A" },
  { fruit: "mango", icon: "🥭", letter: "M" },
  { fruit: "grape", icon: "🍇", letter: "G" },
  { fruit: "banana", icon: "🍌", letter: "B" },
  { fruit: "pineapple", icon: "🍍", letter: "P" },
];

const Game = ({ setScreen }: Props) => {
  const [selectedRedCard, setSelectedRedCard] = useState<{
    fruit: string;
    icon: string;
  } | null>();
  const [selectedBlueCard, setSelectedBlueCard] = useState<{
    fruit: string;
    icon: string;
    letter: string;
  } | null>();
  const [moves, setMoves] = useState(6);
  const [completed, setCompleted] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const selectRedCard = (data: { fruit: string; icon: string }) => {
    if (!selectedRedCard) {
      audioRef?.current?.play();
      setSelectedRedCard(data);
    }
  };

  const selectBlueCard = async (data: {
    fruit: string;
    icon: string;
    letter: string;
  }) => {
    if (!selectedBlueCard && selectedRedCard) {
      await audioRef?.current?.play();
      setSelectedBlueCard(data);

      setTimeout(() => {
        if (selectedRedCard.fruit !== data.fruit) {
          setSelectedRedCard(null);
          setSelectedBlueCard(null);
          setMoves(moves - 1);
          if (moves === 1 && completed.length !== 5) {
            setScreen("gameOver");
          }
        } else {
          if (completed.length === 5) {
            setScreen("complete");
            return;
          }
          setCompleted([...completed, data.fruit]);
          setIsMatched(true);
        }
      }, 1000);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <Loader bananas={completed.length} />
      <audio className="hidden" ref={audioRef} src="/audio/select-card.mp3" />
      {isMatched && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <button
            onClick={() => {
              setIsMatched(false);
              setSelectedRedCard(undefined);
              setSelectedBlueCard(undefined);
            }}
          >
            <img
              src={nextButton}
              alt="start"
              className="absolute bottom-10 right-10 hover:scale-110 transition"
            />
          </button>
          <div className=" z-30 flex gap-14 relative">
            <img
              className="absolute w-[300px] h-[200px] -top-20 -right-32"
              src={match}
              alt="match text"
            />

            <div className="bg-[#eaada0] border-white border-8 p-4 rounded-md w-[190px] h-[240px] mt-2 flex items-center justify-center text-8xl animated-rotate animated-slide-in-left">
              {selectedRedCard?.icon}
            </div>
            <div className="bg-[#eaada0] border-white border-8 p-4 rounded-md text-green-600 w-[190px] h-[240px] mt-2 flex items-center justify-center text-8xl animated-slide-in-right translate-y-[30%]">
              {selectedBlueCard?.letter}
            </div>
          </div>
        </div>
      )}
      <div className=" flex gap-14">
        <div className="grid grid-cols-3 relative ">
          {!selectedBlueCard && !selectedRedCard && completed.length === 0 && (
            <div className="absolute -top-24 right-20 animate-bounce z-10">
              <img className="" src={arrowTop} alt="arrow" />
            </div>
          )}
          {redCardData.map((cardData) => {
            const isSelected =
              selectedRedCard && selectedRedCard.fruit === cardData.fruit;
            const isCompleted = completed.includes(cardData.fruit);
            return (
              <div
                key={cardData.fruit}
                onClick={() => selectRedCard(cardData)}
                className={`transition transform ${
                  isCompleted ? "invisible" : ""
                } ${!selectedRedCard ? "hover:scale-110" : ""} card ${
                  isSelected ? "flipped" : ""
                }`}
              >
                {selectedRedCard && selectedRedCard.fruit === cardData.fruit ? (
                  <div className="bg-[#eaada0] border-white border-8 p-4 rounded-md w-[190px] h-[240px] mt-2 flex items-center justify-center text-8xl">
                    {cardData.icon}
                  </div>
                ) : (
                  <img src={redCard} alt="card" />
                )}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 relative">
          {selectedRedCard && !selectedBlueCard && completed.length === 0 && (
            <div className="absolute -bottom-24 left-20">
              <img className="animate-bounce" src={arrowBottom} alt="arrow" />
            </div>
          )}
          {blueCardData.map((cardData) => {
            const selected =
              selectedBlueCard && cardData.fruit === selectedBlueCard.fruit;
            const isCompleted = completed.includes(cardData.fruit);
            return (
              <div
                key={cardData.fruit}
                onClick={() => selectBlueCard(cardData)}
                className={`transition ${isCompleted ? "invisible" : ""} ${
                  selectedRedCard && !selectedBlueCard ? "hover:scale-110" : ""
                } card ${selected ? "flipped" : ""}`}
              >
                {selected ? (
                  <div className="bg-[#eaada0] border-white border-8 p-4 rounded-md text-green-600 w-[190px] h-[240px] mt-2 flex items-center justify-center text-5xl scale-x-[-1]">
                    {cardData.letter}
                  </div>
                ) : (
                  <img src={blueCard} alt="card" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 bg-sky-400 opacity-85 absolute top-4 right-4 text-white rounded-3xl text-2xl font-bold border-white border-4">
        Wrong Moves Left : {moves}
      </div>
    </div>
  );
};

export default Game;
