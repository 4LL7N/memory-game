import { useContext, useEffect, useRef, useState } from "react"
import { MemoryGame } from "../App"
import { useParams } from "react-router-dom"
import Igmenu from "./Igmenu"
import Gameend from "./Gameend"

interface MemoryGame{
    Theme:boolean,
    setTheme:(Theme:boolean) => void,
    playerNum:number,
    setPlayerNum:(playerNum:number) => void,
    grid:boolean,
    setGrid:(grid:boolean) => void
}

function Game(){
    const params = useParams()
    const context = useContext<MemoryGame>(MemoryGame)
    const buttonNum = useRef<string[]>([])
    let IGplayerNum = useRef<number[]>([])
    const [timer,setTimer] = useState<string>("00:00")
    let gameTime = useRef<number|undefined>()
    const render = useRef(1)
    const [igmenu, setIgmenu] = useState<boolean>(false)
    const [pMoves,setPMoves] = useState<number>(0)
    const [guessM,setGuessM] = useState<any[]>([[],[]])
    const [guessed, setGuessed] = useState<any[]>([])
    const [gameEnd, setGameEnd] = useState<boolean>(false)
    const guessArr = useRef<any>([[],[]])
    const [pTurn,setPTurn] = useState<number>(0)
    const [winner, setWinner] = useState(false)
    useEffect(() => {
        render.current += 1
    })

    useEffect(() => {
        if(params.game == "solo"){
            gameTime.current = setInterval( Timer , 1000)
        }else{
            for(let i = 0 ; i < context.playerNum ; i++){
                IGplayerNum.current.push(0)
            }   
        }
        
    },[])

    if(render.current == 1){ 

        if(context.grid){
            for(let i = 0 ; i < 16 ; i++ ){
                buttonNum.current.push("")
                
            }
            for(let i=1 ; i < 9 ; i ++){
                let random = Math.floor(Math.random() * 16)
                while(buttonNum.current[random]){
                    random = Math.floor(Math.random() * Math.random() * 16)
                }
                buttonNum.current[random] = i.toString()
                random = Math.floor(Math.random() * Math.random() * 16)
                while(buttonNum.current[random]){
                    random = Math.floor(Math.random() * Math.random() * 16)
                }
                buttonNum.current[random] = i.toString()
            }
            
        }else{
            for(let i = 0 ; i < 36 ; i++ ){
                buttonNum.current.push("")
            }
            for(let i=1 ; i < 19 ; i ++){
                let random = Math.floor(Math.random() * 36)
                while(buttonNum.current[random]){
                    random = Math.floor(Math.random() * Math.random() * 36)
                }
                buttonNum.current[random] = i.toString()
                random = Math.floor(Math.random() * Math.random() * 36)
                while(buttonNum.current[random]){
                    random = Math.floor(Math.random() * Math.random() * 36)
                }
                buttonNum.current[random] = i.toString()
            }
        }
    }
        
    console.log(IGplayerNum.current);
    
    
    useEffect(() => {
        if(guessM.length == 2 ){
            setPMoves(pMoves + 1)            
        }
    },[guessM])

    function play(){
        
        if( guessM[0].length == 2 && guessM[1].length == 2 && guessM[0][0] == guessM[1][0]){
            setGuessed([...guessed,guessM[0][1],guessM[1][1]])
        }
        
        if(params.game != "solo" && pTurn != (IGplayerNum.current.length -1) && guessM[0].length > 0){
            if( guessM[0][0] == guessM[1][0]){
                IGplayerNum.current[pTurn] += 1
            }else{
                setPTurn(pTurn + 1)
            }
        }else{
            setPTurn(0)
        }
       
    }

    console.log(guessed);

    function end(){
        if(params.game == "solo"){
            if(guessed.length == 14 && guessArr.current[0][0] == guessArr.current[1][0]){
                setGameEnd(true)
                clearInterval(gameTime.current)
            }
        }else{
            if(guessed.length == 14 && guessArr.current[0][0] == guessArr.current[1][0]){
                IGplayerNum.current[pTurn] += 1
                setWinner(true)
            }
        }
    }


    let second = 0
    let minute = 0

    function Timer(){
        if(second < 59){
            second += 1   
        }else{
            minute += 1
            second = 0
        }
        setTimer(`${minute.toString().length == 1 ?"0":""}${minute}:${second.toString().length == 1?"0":""}${second}`)
    }

    return(
        <>
            <div className="w-[100vw] h-[100vh] bg-[#FCFCFC] p-[24px] " >
                <header className="flex items-center justify-between w-[100%] " >
                    <img className="w-[92px] h-[20px]" src="/images/logo.svg"/>
                    <div className="w-[78px] h-[40px] bg-[#FDA214] rounded-[26px] flex items-center justify-center " onClick={() => setIgmenu(true)} ><p className="text-[16px] text-[#FCFCFC] " >Menu</p></div>
                </header>
                <section className="flex flex-col " >
                    <div key={Math.floor(Math.random() * Math.random())} className={`flex flex-wrap mb-[102px]  ${buttonNum.current.length == 36?"gap-x-[9.12px] gap-y-[9.12px]":"gap-x-[12.29px] gap-y-[12.29px]"} pt-[80px] `} >
                        {buttonNum.current.map((items,index) => {
                           
                            return(
                                <>
                                    <div key={index} className={`flex items-center justify-center ${buttonNum.current.length == 36 ?"w-[46.878px] h-[46.878px]":"w-[72.53px] h-[72.53px]"} rounded-[50%] ${guessed.includes(index)?"bg-[#BCCED9]":guessM.length == 2 && guessM[0][0] == guessM[1][0] && guessM[1][0] == items ?"bg-[#FDA214]":"bg-[#304859]"} `} onClick={ !guessed.includes(index) ?() =>{guessM.length==2?guessArr.current = [[items,index]]:guessM.length == 1?guessArr.current=[guessM[0],[items,index]]:null;setGuessM(guessArr.current);guessM.length >= 2?play():null;end()}:() => {}}  ><p key={index  * Math.random()} className={`${buttonNum.current.length == 36?"text-[24px]":"text-[40px]"} ${guessed.includes(index) || guessM[0].includes(index) || guessM[1]?.includes(index) ?"":"hidden"} text-[#FCFCFC] `}>{items}</p></div>{/**/}{/*guessM[1]?Number(guessM[1][1]) == index:*/}
                                </>
                            )
                        })}
                    </div>
                    <div className={IGplayerNum.current.length > 1?`flex items-center ${IGplayerNum.current.length == 2?"justify-around":"justify-between"} w-[100%]`:""} >
                        {IGplayerNum.current.length > 1? IGplayerNum.current.map((items,index) => {
                            console.log(IGplayerNum)
                            return(
                                <>
                                    <div key={index * (Math.random() * Math.random())} className={`w-[64px] h-[70px] flex flex-col gap-[2px] items-center justify-center ${pTurn == index?"bg-[#FDA214]":"bg-[#DFE7EC]"} rounded-[5px] relative `} >
                                        <p className={`text-[15px] ${pTurn == index?"text-[#FCFCFC]":"text-[#7191A5]"} `} >P{index + 1}</p>
                                        <p className={`text-[24px] ${pTurn == index?"text-[#FCFCFC]":"text-[#304859]"} `}>{items}</p>
                                        <div className={`${pTurn == index?"":"hidden"}  w-[15px] h-[15px] ${"bg-[#FDA214]"} absolute left-[25px] top-[-8px] transform rotate-45 `} ></div>
                                    </div>
                                </>
                            )
                        }):
                        <div className="flex gap-[25px] " >
                            <div className=" w-[151px] h-[70px] py-[10px] bg-[#DFE7EC] flex flex-col items-center rounded-[5px]" >
                                <p className="text-[15px] text-[#7191A5] " >Time</p>
                                <h1 className='text-[24px] text-[#304859] ' >{timer}</h1>
                            </div>
                            <div className=" w-[151px] h-[70px] py-[10px] bg-[#DFE7EC] flex flex-col items-center rounded-[5px]" >
                                <p className="text-[15px] text-[#7191A5] " >Move</p>
                                <h1 className='text-[24px] text-[#304859] ' >{pMoves - 1}</h1>
                            </div>
                        </div>
                        }
                    </div>
                </section>
                <div className={`  ${igmenu || gameEnd ?"duration-700 block ":"duration-700 hidden "}  w-[100%] h-[100%] absolute top-0 left-0 bg-[#000000] opacity-50 `} />
                <Igmenu igmenu={igmenu} setIgmenu={setIgmenu} buttonNum={buttonNum.current} timer={timer} setTimer={setTimer} />
                <Gameend  gameEnd={gameEnd} setGameEnd={setGameEnd} timer={timer} pMoves={pMoves} />
            </div>
        </>
    )
}

export default Game