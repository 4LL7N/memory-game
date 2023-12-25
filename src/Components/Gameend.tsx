import { useNavigate } from "react-router-dom"

function Gameend(props:{gameEnd:boolean,setGameEnd:(gameEnd:boolean) => void,timer:string,pMoves:number}){
    const naviagte = useNavigate()
    return(
        <>
        <div className={` flex flex-col items-center w-[327px] h-[376px] rounded-[10px] px-[24px] pt-[32px] pb-[24px] absolute  left-[24px] ${props.gameEnd?" duration-700 ease-out top-[146px]":" duration-700 ease-in top-[-376px]"} bg-[#FFF] `}>
            <h1 className="text-[24px] text-[#152938] mb-[9px]" >You did it!</h1>
            <h2 className="text-[14px] text-[#7191A5] mb-[24px] " >Game over! Here’s how you got on…</h2>
            <div className="flex items-center justify-between w-[100%] h-[48px] bg-[#DFE7EC] rounded-[5px] mb-[8px] px-[16px] ">
                <p className="text-[14px] text-[#7191A5] " >Time Elapsed</p>
                <p className=" text-[20px] text-[#304859] " >{props.timer}</p>
            </div>
            <div className="flex items-center justify-between w-[100%] h-[48px] bg-[#DFE7EC] rounded-[5px] mb-[24px] px-[16px] ">
                <p className="text-[14px] text-[#7191A5] " >Moves Taken</p>
                <p className=" text-[20px] text-[#304859] " >{props.pMoves -1 } Moves</p>
            </div>
            <div className="flex flex-col w-[100%] gap-[16px] " >
                <button className="w-[100%] h-[48px] flex items-center justify-center bg-[#FDA214] rounded-[26px] " onClick={() => {props.setGameEnd(false);window.location.reload()}} ><p className="text-[18px] text-[#FCFCFC] " >Restart</p></button>
                <button className="w-[100p%] h-[48px] flex items-center justify-center bg-[#DFE7EC] rounded-[26px] " onClick={() => { window.location.reload() ;props.setGameEnd(false); naviagte("/") } } ><p className="text-[18px] text-[#304859] " >Setup New Game</p></button>
            </div>
        </div>
        </>
    )
}

export default Gameend