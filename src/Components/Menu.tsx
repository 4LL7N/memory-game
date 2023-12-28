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
    // console.log("menuuu8uuuuuuuuuu");
    
    return(
        <>
            <div className="w-[100vw] h-[100vh] bg-[#152938] flex flex-col items-center pt-[80px] md:pt-[169px] lg:pt-[80px] " >
                <h1 className="text-[32px] text-[#FCFCFC] mb-[45px] md:mb-[78px] lg:mb-[60px] " >memory</h1>
                <div className="w-[327px] md:w-[654px] bg-[#FCFCFC] p-[24px] md:p-[56px] rounded-[10px]" >
                    <h2 className="text-[15px] md:text-[20px] text-[#7191A5] mb-[11px] md:mb-[16px] " >Select Theme</h2>
                    <div className="flex gap-[11px] md:gap-[30px] w-[100%] mb-[24px] md:mb-[32px] "  >
                        <div className={`flex items-center justify-center w-[134px] md:w-[256px] h-[40px] md:h-[52px] hover:bg-[#6395B8]  ${context.Theme?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setTheme(true) } ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >Numbers</p></div>
                        <div className={`flex items-center justify-center w-[134px] md:w-[256px] h-[40px] md:h-[52px] hover:bg-[#6395B8]  ${!context.Theme?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => context.setTheme(false)} ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >Icons</p></div>
                    </div>
                    <h2 className="text-[15px] md:text-[20px] text-[#7191A5] mb-[11px] md:mb-[16px] " >Numbers of Players</h2>
                    <div className="flex gap-[11px] md:gap-[22px] w-[100%] mb-[24px] md:mb-[33px] " >
                        <div className={`flex items-center justify-center w-[62px] md:w-[119px] h-[40px] md:h-[52px]  hover:bg-[#6395B8] ${context.playerNum == 1?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => {context.setPlayerNum(1); localStorage.setItem("playerNum","1")} } ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >1</p></div>
                        <div className={`flex items-center justify-center w-[62px] md:w-[119px] h-[40px] md:h-[52px]  hover:bg-[#6395B8] ${context.playerNum == 2?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => {context.setPlayerNum(2); localStorage.setItem("playerNum","2")} } ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >2</p></div>
                        <div className={`flex items-center justify-center w-[62px] md:w-[119px] h-[40px] md:h-[52px]  hover:bg-[#6395B8] ${context.playerNum == 3?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => {context.setPlayerNum(3); localStorage.setItem("playerNum","3")} } ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >3</p></div>
                        <div className={`flex items-center justify-center w-[62px] md:w-[119px] h-[40px] md:h-[52px]  hover:bg-[#6395B8] ${context.playerNum == 4?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px] `} onClick={() => {context.setPlayerNum(4); localStorage.setItem("playerNum","4")} } ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >4</p></div>  
                    </div>
                    <h2 className="text-[15px] md:text-[20px] text-[#7191A5] mb-[11px] md:mb-[16px] rounded-[26px] " >Grid Size</h2>
                    <div className="flex gap-[11px] md:gap-[30px] w-[100%] mb-[32px] md:mb-[33px] "  >
                        <div className={`flex items-center justify-center w-[134px] md:w-[256px] h-[40px] md:h-[52px] hover:bg-[#6395B8]  ${context.grid?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px]`} onClick={() => context.setGrid(true)} ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >4x4</p></div>
                        <div className={`flex items-center justify-center w-[134px] md:w-[256px] h-[40px] md:h-[52px] hover:bg-[#6395B8]  ${!context.grid?"bg-[#304859]":"bg-[#BCCED9]"} rounded-[26px]`} onClick={() => context.setGrid(false)} ><p className="text-[16px] md:text-[26px] text-[#FCFCFC]" >6x6</p></div>
                    </div>
                    <Link to={context.playerNum == 1?"/solo":"/multiplayer"} className="flex items-center justify-center w-[279px] md:w-[541px] h-[48px] md:h-[70px] bg-[#FDA214] hover:bg-[#FFB84A]  rounded-[26px] md:rounded-[35px] " ><p className="text-[18px] md:text-[32px] text-[#FCFCFC] " >Start Game</p></Link>
                </div>
            </div>
        </>
    )
}

export default Menu