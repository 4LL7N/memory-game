import { useContext, useEffect, useRef, useState } from "react"
import { MemoryGame } from "../App"
import { useParams } from "react-router-dom"
import Igmenu from "./Igmenu"

interface MemoryGame{
    Theme:boolean,
    setTheme:(Theme:boolean) => void,
    playerNum:number,
    setPlayerNum:(playerNum:number) => void,
    grid:boolean,
    setGrid:(grid:boolean) => void
}

// interface Move{
//     [
//     number,
//     string  
//     ]
// }

function Game(){
    const params = useParams()
    const context = useContext<MemoryGame>(MemoryGame)
    const buttonNum = useRef<string[]>([])
    let playerNum = []
    const [timer,setTimer] = useState<string>("00:00")
    const render = useRef(1)
    const [igmenu, setIgmenu] = useState<boolean>(false)

    const [pMoves,setPMoves] = useState<number>(0)

    const [guessM,setGuessM] = useState<any[]>([[],[]])
    // const [secondM, setSecondM] = useState<string|undefined>()
    const [guessed, setGuessed] = useState<any[]>([])

    // const [match, setmatch] = useState<boolean>(false)

    useEffect(() => {
        render.current += 1
    })

    // useEffect(() => {
    //     setInterval( Timer , 1000)
    // },[])

    // useEffect(() => {
    if(render.current == 1){ 
        // console.log(render.current)

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
    // },[])
    
    console.log(buttonNum.current);
    

    if(params.game == "/multiplayer"){
        for(let i = 0 ; i < context.playerNum ; i++){
            playerNum.push("")
        }   
    }
    
    useEffect(() => {
        if(guessM.length == 2 ){
            setPMoves(pMoves + 1)
            // play()
            
            
            
        }
    },[guessM])
    // if(guessM.length == 2 ){
    //     setGuessM([])
    // }

    // console.log(guessM);
    // console.log(guessM.length);
    // console.log(guessM[0] == guessM[1]);
    

    // console.log(guessed);

    function play(){
        console.log("render",render.current);
        
        
            if( guessM[0].length == 2 && guessM[1].le && guessM[0][0] == guessM[1][0]){
                setGuessed([...guessed,guessM[0][1],guessM[1][1]])
            // setmatch(true)
            // console.log( "guess 1",guessM);
            }
        
        // setGuessM([])
        // console.log( "guess 2",guessM);

    }

    let second = 0
    let minute = 0

    function Timer(){
        if(second < 59){
            second += 1   
            // console.log(second.toString().length);
        }else{
            minute += 1
            second = 0
        }
        setTimer(`${minute.toString().length == 1 ?"0":""}${minute}:${second.toString().length == 1?"0":""}${second}`)
    }


    
    console.log("guessM " ,guessM);
    console.log("guessed " ,guessed);
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
                            let guessArr:any[] = [[],[]]
                            // if(guessM.length == 2){
                            //     guessArr = [[items,index]]
                            // }else if(guessM.length == 1){
                            //     guessArr = [...guessM,[items,index]]
                            // }
                            // console.log(guessM[0]?guessM[0]:"nope")
                            // console.log(index);
                            console.log(guessArr.length);
                            // console.log(guessM);
                            
                            
                            // guessM[0]? Number(guessM[0][1]) == index?console.log("equla"):console.log("not equal"):guessM[0]
                            
                            

                            return(
                                <>
                                    <div key={index} className={`flex items-center justify-center ${buttonNum.current.length == 36 ?"w-[46.878px] h-[46.878px]":"w-[72.53px] h-[72.53px]"} rounded-[50%] ${guessed.includes(index)?"bg-[#BCCED9]":guessM.length == 2 && guessM[0][0] == guessM[1][0] && guessM[1][0] == items ?"bg-[#FDA214]":"bg-[#304859]"} `} onClick={ !guessed.includes(index) ?() =>{ console.log(guessM.length) ;guessM.length==2?guessArr=[[items,index]]:guessM.length == 1?guessArr=[guessM[0],[items,index]]:null ;setGuessM(guessArr);guessM.length >= 2?play():console.log("guessM in not 2 element");console.log("guessArr[0] " ,guessArr[0]) ;console.log("guessArr[0] not includes index " ,!guessArr[0].includes(index));console.log("index " ,index)}:() => {}}  ><p key={index  * Math.random()} className={`${buttonNum.current.length == 36?"text-[24px]":"text-[40px]"} ${guessed.includes(index) || guessArr[0].includes(index) ?"":"hidden"} text-[#FCFCFC] `}>{items}</p></div>{/**/}{/*guessM[1]?Number(guessM[1][1]) == index:*/}
                                </>
                            )
                        })}
                    </div>
                    <div>
                        {playerNum.length > 1? playerNum.map((items,index) => {
                            return(
                                <>
                                    <div key={index * (Math.random() * Math.random())} className={`w-[64px] h-[70px] ${"bg-[#DFE7EC]"} rounded-[5px]`} ><p className={`${buttonNum.current.length == 36?"text-[24px]":"text-[40px]"} text-[#FCFCFC] `}   >{items}</p></div>
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
                                <h1 className='text-[24px] text-[#304859] ' >{pMoves}</h1>
                            </div>
                        </div>
                        }
                    </div>
                </section>
                <div className={`  ${!igmenu?"duration-700 hidden ":"duration-700 block "}  w-[100%] h-[100%] absolute top-0 left-0 bg-[#000000] opacity-50 `} />
                <Igmenu igmenu={igmenu} setIgmenu={setIgmenu} buttonNum={buttonNum.current} timer={timer} setTimer={setTimer} />
            </div>
        </>
    )
}

export default Game