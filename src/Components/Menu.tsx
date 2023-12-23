import { useContext } from "react"
import { Link } from "react-router-dom"
import { MemoryGame } from "../App"

interface MemoryGame{
    Theme:boolean,
    setTheme:(Theme:boolean) => void,
    playerNum:number,
    setPlayerNum:(playerNum:number) => void,
    grid:boolean,
    setGrid:(grid:boolean) => void
}

function Menu(){

    const context = useContext<MemoryGame>(MemoryGame)

    return(
        <>
            <div className="w-[100vw] h-[100vh] bg-[#152938] flex flex-col items-center pt-[80px] " >
                <h1 className="text-[32px] text-[#FCFCFC] mb-[45px] " >memory</h1>
                <div className="w-[327px] bg-[#FCFCFC] p-[24px] rounded-[10px]" >
                    <h2 className="text-[15px] text-[#7191A5] mb-[11px]" >Select Theme</h2>
                    <div className="flex gap-[11px] w-[100%] mb-[24px]"  >
                        <div className={`flex items-center justify-center w-[134px] h-[40px] ${context.Theme?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setTheme(true) } ><p className="text-[16px] text-[#FCFCFC]" >Numbers</p></div>
                        <div className={`flex items-center justify-center w-[134px] h-[40px] ${!context.Theme?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setTheme(false)} ><p className="text-[16px] text-[#FCFCFC]" >Icons</p></div>
                    </div>
                    <h2 className="text-[15px] text-[#7191A5] mb-[11px]" >Numbers of Players</h2>
                    <div className="flex gap-[11px] w-[100%] mb-[24px] " >
                        <div className={`flex items-center justify-center w-[62px] h-[40px] ${context.playerNum == 1?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setPlayerNum(1) } ><p className="text-[16px] text-[#FCFCFC]" >1</p></div>
                        <div className={`flex items-center justify-center w-[62px] h-[40px] ${context.playerNum == 2?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setPlayerNum(2) } ><p className="text-[16px] text-[#FCFCFC]" >2</p></div>
                        <div className={`flex items-center justify-center w-[62px] h-[40px] ${context.playerNum == 3?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setPlayerNum(3) } ><p className="text-[16px] text-[#FCFCFC]" >3</p></div>
                        <div className={`flex items-center justify-center w-[62px] h-[40px] ${context.playerNum == 4?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setPlayerNum(4) } ><p className="text-[16px] text-[#FCFCFC]" >4</p></div>  
                    </div>
                    <h2 className="text-[15px] text-[#7191A5] mb-[11px] rounded-[26px] " >Grid Size</h2>
                    <div className="flex gap-[11px] w-[100%] mb-[32px]"  >
                        <div className={`flex items-center justify-center w-[134px] h-[40px] ${context.grid?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px]`} onClick={() => context.setGrid(true)} ><p className="text-[16px] text-[#FCFCFC]" >4x4</p></div>
                        <div className={`flex items-center justify-center w-[134px] h-[40px] ${!context.grid?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px]`} onClick={() => context.setGrid(false)} ><p className="text-[16px] text-[#FCFCFC]" >6x6</p></div>
                    </div>
                    <Link to={context.playerNum == 1?"/solo":"/multiplayer"} className="flex items-center justify-center w-[279px] h-[48px] bg-[#FDA214]  rounded-[26px] " ><p className="text-[18px] tetx-[#FCFCFC] " >Start Game</p></Link>
                </div>
            </div>
        </>
    )
}

export default Menu