import { useNavigate } from "react-router-dom"

function Gameend(props:{gameEnd:boolean,setGameEnd:(gameEnd:boolean) => void,timer:string,pMoves:number}){
    const naviagte = useNavigate()
    return(
        <>
        <div className={` flex flex-col items-center w-[327px] md:w-[654px] h-[376px] md:h-[510px] rounded-[10px] px-[24px] md:px-[56px] pt-[32px] md:pt-[51px] pb-[24px] md:pb-[69px] absolute  left-[24px] md:left-[57px] lg:left-[393px] ${props.gameEnd?" duration-700 ease-out top-[146px] md:top-[257px] ":" duration-700 ease-in top-[-376px] md:top-[-510px] "} bg-[#FFF] `}>
            <h1 className="text-[24px] md:text-[48px] text-[#152938] mb-[9px]" >You did it!</h1>
            <h2 className="text-[14px] md:text-[18px] text-[#7191A5] mb-[24px] " >Game over! Here’s how you got on…</h2>
            <div className="flex items-center justify-between w-[100%] h-[48px] md:h-[72px] bg-[#DFE7EC] rounded-[5px] md:rounded-[10px] mb-[8px] md:mb-[16px] px-[16px] md:px-[32px] ">
                <p className="text-[14px] md:text-[18px] text-[#7191A5] " >Time Elapsed</p>
                <p className=" text-[20px] md:text-[32px] text-[#304859] " >{props.timer}</p>
            </div>
            <div className="flex items-center justify-between w-[100%] h-[48px] md:h-[72px] bg-[#DFE7EC] rounded-[5px] md:rounded-[10px] mb-[24px] md:mb-[40px] px-[16px] md:px-[32px] ">
                <p className="text-[14px] md:text-[18px] text-[#7191A5] " >Moves Taken</p>
                <p className=" text-[20px] md:text-[32px] text-[#304859] " >{props.pMoves -1 } Moves</p>
            </div>
            <div className="flex flex-col md:flex-row w-[100%] gap-[16px] md:gap-[14px] " >
                <button className="w-[100%] md:w-[264px] h-[48px] md:h-[52px] flex items-center justify-center bg-[#FDA214] rounded-[26px] " onClick={() => {props.setGameEnd(false);window.location.reload()}} ><p className="text-[18px] md:text-[20px] text-[#FCFCFC] " >Restart</p></button>
                <button className="w-[100p%] md:w-[264px] h-[48px] md:h-[52px] flex items-center justify-center bg-[#DFE7EC] rounded-[26px] " onClick={() => {props.setGameEnd(false); naviagte("/"); window.location.reload()  } } ><p className="text-[18px] md:text-[20px] text-[#304859] " >Setup New Game</p></button>
            </div>
        </div>
        </>
    )
}

export default Gameend