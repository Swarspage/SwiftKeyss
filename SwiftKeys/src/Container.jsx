import React from "react";
import {
  wordPoolEasy,
  wordPoolCombined,
  wordPoolHard,
  wordPoolMedium,
} from "./wordPool";
import { useState, useEffect } from "react";

const Container = () => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [currentWordpool, setCurrentWordpool] = useState([""]);
  const [difficulty, setDifficulty] = useState("");
  const [speed, setSpeed] = useState("");
  const [time, setTime] = useState("");
  const [inputValue, setInputValue] = useState("");

  const easyWordpoolGenerator = () => {
    const selectedWords = [];

    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * wordPoolEasy.length);
      selectedWords.push(wordPoolEasy[randomIndex]);
    }
    console.log(selectedWords);
    return selectedWords;
  };

  function mediumWordpoolGenerator() {
    const selectedWords = [];

    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * wordPoolMedium.length);
      selectedWords.push(wordPoolMedium[randomIndex]);
    }
    console.log(selectedWords);

    return selectedWords;
  }
  function hardWordpoolGenerator() {
    const selectedWords = [];

    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * wordPoolHard.length);
      selectedWords.push(wordPoolHard[randomIndex]);
    }
    console.log(selectedWords);

    return selectedWords;
  }
  function combinedWordpoolGenerator() {
    const selectedWords = [];

    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * wordPoolCombined.length);
      selectedWords.push(wordPoolCombined[randomIndex]);
    }
    console.log(selectedWords);

    return selectedWords;
  }

  const loadWordpool = (difficulty) => {
    if (difficulty === "Easy") {
      setCurrentWordpool(easyWordpoolGenerator());
    } else if (difficulty === "Medium") {
      setCurrentWordpool(mediumWordpoolGenerator());
    } else if (difficulty === "Hard") {
      setCurrentWordpool(hardWordpoolGenerator());
    } else if (difficulty === "Combined") {
      setCurrentWordpool(combinedWordpoolGenerator());
    }
  };
  const handleTimer = () => {};
  const handleTimeSelection = (e) => {
    const timeValue = e.target.value;
    setTime(timeValue);
  };
  const handleDifficultySelection = (e) => {
    const difficultyValue = e.target.value;
    setDifficulty(difficultyValue);
    loadWordpool(difficultyValue);
  };
  const handleSpeedSelection = (e) => {
    const speedValue = e.target.value;
    setSpeed(speedValue);
  };

  useEffect(() => {
    setInputValue("");
  }, [difficulty, speed, time]);
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 ">
        <div className="text-[white] font-[Quicksand] bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-2xl p-4 flex justify-center">
          <div className="article w-[70%] flex items-center ">
            <div className="px-12 w-[100%]">
              <p className="text-2xl">Lets see how fast you are...</p>
              <p id="timer" className="text-2xl">
                {timer}
              </p>
              <div className="option-selector bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] p-2 my-4">
                <ul className="flex justify-around">
                  <li>
                    <select
                      className="outline-none"
                      name=""
                      id="time"
                      onChange={handleTimeSelection}
                    >
                      <option
                        className="bg-black text-white outline-none"
                        value="Time"
                      >
                        Time
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="1m"
                      >
                        1m
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="2m"
                      >
                        2m
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Endless"
                      >
                        Endless
                      </option>
                    </select>
                  </li>
                  <li>
                    <select
                      className="outline-none"
                      name=""
                      id="difficulty"
                      onChange={handleDifficultySelection}
                    >
                      <option
                        className="bg-black text-white outline-none"
                        value="Difficulty"
                      >
                        Difficulty
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Easy"
                      >
                        Easy
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Medium"
                      >
                        Mid
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Hard"
                      >
                        Hard
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Combined"
                      >
                        Combined/Random
                      </option>
                    </select>
                  </li>
                  <li>
                    <select
                      className="outline-none"
                      name=""
                      id="speed"
                      onChange={handleSpeedSelection}
                    >
                      <option
                        className="bg-black text-white outline-none"
                        value="Speed"
                      >
                        Speed
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Normal"
                      >
                        Normal
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Rapid"
                      >
                        Rapid
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Adaptive"
                      >
                        Adaptive
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Blind"
                      >
                        Blind
                      </option>
                      <option
                        className="bg-black text-white outline-none"
                        value="Marathon"
                      >
                        Marathon
                      </option>
                    </select>
                  </li>
                </ul>
              </div>
              <div
                className="option-selector bg-[#e2dfdb0c] w-[100%] outline-none h-auto min-h-[120px] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] p-2 my-2 overflow-auto"
                name="wordpoolDisplay"
                id="display-wordpool"
              >
                {currentWordpool.join(" ")}
              </div>

              <textarea
                className="bg-[#e2dfdb0c] w-[100%] outline-none resize-none h-30 shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] p-2 my-2"
                id="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="aside w-[30%] px-8">
            <div className="option-selector bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] p-2  my-4">
              <p>Live Statisctics</p>
              <br />
              <div className="flex flex-col gap-2">
                <p>
                  WPM:
                  <span className="bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] mx-2 p-1">
                    {wpm}
                  </span>
                </p>
                <p>
                  Accuracy:
                  <span className="bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] mx-2 p-1">
                    {accuracy}
                  </span>
                </p>
                <p>
                  Keystrokes:
                  <span className="bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] mx-2 p-1">
                    {keystrokes}
                  </span>
                </p>
                <p>
                  Time:
                  <span className="bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-[8px] mx-2 p-1">
                    {timer}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-[100%]">
              <button
                className="border-white w-[100%] rounded-2xl border-solid border-1 p-2 transform transition ease-in-out duration-500 hover:bg-amber-50 hover:text-[black] hover:cursor-pointer "
                onClick={() => loadWordpool(difficulty)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
