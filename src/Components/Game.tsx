import { useContext, useEffect, useRef, useState } from "react";
import { MemoryGame } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import Igmenu from "./Igmenu";
import Gameend from "./Gameend";
import Winner from "./Winner";

interface MemoryGame {
  Theme: boolean;
  setTheme: (Theme: boolean) => void;
  playerNum: number;
  setPlayerNum: (playerNum: number) => void;
  grid: boolean;
  setGrid: (grid: boolean) => void;
}

function Game() {

  const params = useParams();
  const context = useContext<MemoryGame>(MemoryGame);
  const buttonNum = useRef<string[]>([]);
  const IGplayerNum = useRef<number[]>(params.game == "solo"?[]:Array.from({length:Number(localStorage.getItem("playerNum"))},() => 0));
  const [timer, setTimer] = useState<string>("00:00");
  let gameTime = useRef<number | undefined>();
  const render = useRef(1);
  const [igmenu, setIgmenu] = useState<boolean>(false);
  const [pMoves, setPMoves] = useState<number>(0);
  const [guessM, setGuessM] = useState<any[]>([[], []]);
  const [guessed, setGuessed] = useState<any[]>([]);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const guessArr = useRef<any>([[], []]);
  const [pTurn, setPTurn] = useState<number>(0);
  const [winner, setWinner] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    render.current += 1;
  });
//   console.log(IGplayerNum.current);
//   console.log(Array.from({length:context.playerNum},() => 0));
  
  
  useEffect(() => {
    if (params.game == "solo") {
      gameTime.current = setInterval(Timer, 1000);
    }
  }, []);

  if (render.current == 1) {
    if (context.grid) {
      for (let i = 0; i < 16; i++) {
        buttonNum.current.push("");
      }
      for (let i = 1; i < 9; i++) {
        let random = Math.floor(Math.random() * 16);
        while (buttonNum.current[random]) {
          random = Math.floor(Math.random() * Math.random() * 16);
        }
        buttonNum.current[random] = i.toString();
        random = Math.floor(Math.random() * Math.random() * 16);
        while (buttonNum.current[random]) {
          random = Math.floor(Math.random() * Math.random() * 16);
        }
        buttonNum.current[random] = i.toString();
      }
    } else {
      for (let i = 0; i < 36; i++) {
        buttonNum.current.push("");
      }
      for (let i = 1; i < 19; i++) {
        let random = Math.floor(Math.random() * 36);
        while (buttonNum.current[random]) {
          random = Math.floor(Math.random() * Math.random() * 36);
        }
        buttonNum.current[random] = i.toString();
        random = Math.floor(Math.random() * Math.random() * 36);
        while (buttonNum.current[random]) {
          random = Math.floor(Math.random() * Math.random() * 36);
        }
        buttonNum.current[random] = i.toString();
      }
    }
  }

  // console.log(IGplayerNum.current);

  useEffect(() => {
    if (guessM.length == 2) {
      setPMoves(pMoves + 1);
    }
  }, [guessM]);

  function play() {
    console.log(guessArr?.current[0].length == 2)
    console.log(guessArr?.current[1].length == 2)
    console.log(guessArr.current[0][0] == guessArr.current[1][0])
    if (
      guessArr?.current[0].length == 2 &&
      guessArr?.current[1].length == 2 &&
      guessArr.current[0][0] == guessArr.current[1][0]
    ) {
      setGuessed([...guessed, guessArr.current[0][1], guessArr.current[1][1]]);
    }
    

    if (
      params.game != "solo" &&
      pTurn != IGplayerNum.current.length  &&
      guessArr.current[0].length > 0
    ) {
      // setPTurn(pTurn + 1)

      
      if (guessArr.current[0][0] == guessArr.current[1][0] ) {
        // console.log(pTurn);

        IGplayerNum.current[pTurn] += 1;
      } else {
        // console.log( "next player ",pTurn);
        if(pTurn != 2){
            setPTurn(pTurn + 1);
        }else{
            setPTurn(0);
        }
      }
    } else {
      setPTurn(0);
    }
    // console.log(IGplayerNum.current)
  }

  // console.log(guessed);

  function end() {
    if (params.game == "solo") {
      if (
        guessed.length == 14 &&
        guessArr.current[0][0] == guessArr.current[1][0]
      ) {
        setGameEnd(true);
        clearInterval(gameTime.current);
      }
    } else {
      if (
        guessed.length == 14 &&
        guessArr.current[0][0] == guessArr.current[1][0]
      ) {
        IGplayerNum.current[pTurn] += 1;
        setWinner(true);
      }
      console.log("end");
    }
  }

  let second = 0;
  let minute = 0;

  function Timer() {
    if (second < 59) {
      second += 1;
    } else {
      minute += 1;
      second = 0;
    }
    setTimer(
      `${minute.toString().length == 1 ? "0" : ""}${minute}:${
        second.toString().length == 1 ? "0" : ""
      }${second}`
    );
  }

  return (
    <>
      <div className=" flex flex-col items-center w-[100vw] min-h-[100vh] bg-[#FCFCFC] p-[24px] md:px-[39px] lg:px-[165px] md:pb-[39px] lg:pb-[40px] md:pt-[37px] lg:pt-[68px] ">
        <header className="flex items-center justify-between w-[100%] ">
          <img
            className="w-[92px] md:w-[153px] h-[20px] md:h-[30px] "
            src="/images/logo.svg"
          />
          {window.screen.width < 640 ? (
            <div
              className="w-[78px] h-[40px] bg-[#FDA214] rounded-[26px] flex items-center justify-center "
              onClick={() => setIgmenu(true)}
            >
              <p className="text-[16px] text-[#FCFCFC] ">Menu</p>
            </div>
          ) : (
            <div className="flex gap-[16px] ">
              <div
                className=" flex items-center justify-center w-[127px] h-[52px] bg-[#FDA214] hover:bg-[#FFB84A] rounded-[26px] "
                onClick={() => {
                  window.location.reload();
                }}
              >
                <p className="text-[20px] text-[#FCFCFC] ">Restart</p>
              </div>
              <div
                className=" flex items-center justify-center w-[127px] h-[52px] bg-[#DFE7EC] hover:bg-[#6395B8] rounded-[26px] "
                onClick={() => {
                  navigate("/");
                  window.location.reload();
                }}
              >
                <p className="text-[20px] text-[#304859] ">New Game</p>
              </div>
            </div>
          )}
        </header>
        <section className="flex flex-col items-center ">
          <div
            key={Math.floor(Math.random() * Math.random())}
            className={`flex flex-wrap mb-[102px] md:mb-[126px] md:w-[572px] ${
              buttonNum.current.length == 36
                ? "gap-x-[9.12px] md:gap-x-[16px] gap-y-[9.12px]  md:gap-y-[16px] "
                : "gap-x-[12.29px]  md:gap-x-[20px] gap-y-[12.29px]  md:gap-y-[20px] md:ml-[59px] "
            } pt-[80px] md:pt-[121px]  `}
          >
            {buttonNum.current.map((items, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={`flex items-center justify-center ${
                      buttonNum.current.length == 36
                        ? "w-[46.878px] md:w-[82px] h-[46.878px] md:h-[82px]"
                        : "w-[72.53px] md:w-[118px] h-[72.53px]  md:h-[118px] "
                    } rounded-[50%] ${
                      guessed.includes(index)
                        ? "bg-[#BCCED9]"
                        : guessM.length == 2 &&
                          guessM[0][0] == guessM[1][0] &&
                          guessM[1][0] == items
                        ? "bg-[#FDA214]"
                        : "bg-[#304859] hover:bg-[#6395B8] "
                    } `}
                    onClick={
                      !guessed.includes(index)
                        ? () => {
                            guessM.length == 2
                              ? (guessArr.current = [[items, index]])
                              : guessM.length == 1
                              ? (guessArr.current = [guessM[0], [items, index]])
                              : null;
                            setGuessM(guessArr.current);
                            console.log(guessed);
                            console.log("guessM ",guessM)
                            console.log("guessArr.current ",guessArr.current);
                            guessArr.current.length >= 2 ? play() : null;
                            guessArr.current.length >= 2 ? end():null;
                          }
                        : () => {}
                    }
                  >
                    <p
                      key={index * Math.random()}
                      className={`${
                        buttonNum.current.length == 36
                          ? "text-[24px] md:text-[44px] "
                          : "text-[40px] md:text-[56px] "
                      } ${
                        guessed.includes(index) ||
                        guessM[0].includes(index) ||
                        guessM[1]?.includes(index)
                          ? ""
                          : "hidden"
                      } text-[#FCFCFC] `}
                    >
                      {items}
                    </p>
                  </div>
                  {/**/}
                  {/*guessM[1]?Number(guessM[1][1]) == index:*/}
                </>
              );
            })}
          </div>
          <div
            className={
              IGplayerNum.current.length > 1
                ? `flex items-center ${
                    IGplayerNum.current.length == 2
                      ? "justify-around"
                      : "justify-between"
                  } w-[100%] lg:w-[1110px] `
                : ""
            }
          >
            {IGplayerNum.current.length > 1 ? (
              IGplayerNum.current.map((items: number, index: number) => {
                // console.log(index, items)
                return (
                  <>
                  <div className="flex flex-col items-center " >
                    <div
                      key={index * (Math.random() * Math.random())}
                      className={`w-[64px] md:w-[164px] lg:w-[255px] h-[70px] md:h-[80px] lg:h-[72px] flex flex-col lg:flex-row gap-[2px] items-center md:items-start lg:items-center justify-center lg:justify-between md:px-[16px] lg:px-[22.5px] ${
                        pTurn == index ? "bg-[#FDA214]" : "bg-[#DFE7EC]"
                      } rounded-[5px] md:rounded-[10px] relative `}
                    >
                      <p
                        className={`text-[15px] ${
                          pTurn == index ? "text-[#FCFCFC]" : "text-[#7191A5]"
                        } `}
                      >
                        {window.screen.width < 640?`P ${index + 1}`:`Player ${index + 1}`}
                      </p>
                      <p
                        className={`text-[24px] ${
                          pTurn == index ? "text-[#FCFCFC]" : "text-[#304859]"
                        } `}
                      >
                        {items}
                      </p>
                      <div
                        className={`${
                          pTurn == index ? "" : "hidden"
                        }  w-[15px] lg:w-[20px] h-[15px] lg:h-[20px] ${"bg-[#FDA214]"} absolute left-[25px] md:left-[75px] lg:left-[117px] top-[-8px] transform rotate-45 `}
                      ></div>
                    </div>
                        <p className={`text-[13px]  ${pTurn == index ?"text-[#152938]":"text-[transparent]"} tracking-[5px] mt-[23px] `} >CURRENT TURN</p>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="flex md:justify-center gap-[25px] md:gap-[30px]  ">
                <div className=" w-[151px] md:w-[255px] h-[70px] md:h-[72px] py-[10px] md:py-[25px] md:pl-[21px] md:pr-[24px] bg-[#DFE7EC] flex flex-col md:flex-row items-center md:justify-between rounded-[5px]">
                  <p className="text-[15px] text-[#7191A5] ">Time</p>
                  <h1 className="text-[24px] text-[#304859] ">{timer}</h1>
                </div>
                <div className=" w-[151px] md:w-[255px] h-[70px] md:h-[72px] py-[10px] md:py-[25px] md:pl-[21px] md:pr-[24px]  bg-[#DFE7EC] flex flex-col md:flex-row items-center md:justify-between rounded-[5px]">
                  <p className="text-[15px] text-[#7191A5] ">Move</p>
                  <h1 className="text-[24px] text-[#304859] ">{pMoves - 1}</h1>
                </div>
              </div>
            )}
          </div>
        </section>
        <div
          className={`  ${
            igmenu || gameEnd || winner
              ? "duration-700 block "
              : "duration-700 hidden "
          }  w-[100%] h-[100%] lg:h-[1054px] absolute top-0 left-0 bg-[#000000] opacity-50 `}
        />
        <Igmenu
          igmenu={igmenu}
          setIgmenu={setIgmenu}
          buttonNum={buttonNum.current}
          timer={timer}
          setTimer={setTimer}
        />
        <Gameend
          gameEnd={gameEnd}
          setGameEnd={setGameEnd}
          timer={timer}
          pMoves={pMoves}
        />
        <Winner
          winner={winner}
          setWinner={setWinner}
          IGplayerNum={IGplayerNum.current}
        />
      </div>
    </>
  );
}

export default Game;
