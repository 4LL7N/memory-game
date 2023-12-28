import { useRef } from "react"
import { useNavigate } from "react-router-dom"

function Winner(props:{winner:boolean,setWinner:(winner:boolean) => void,IGplayerNum:number[]}){

    const navigate = useNavigate()

    let leaderbord: any[][] = []
    // let winnerObj:any = {}
    // for(let i =0 ; i <props.IGplayerNum.length; i++){
    //     winnerObj[i] = props.IGplayerNum[i]
    // }
    // console.log(winnerObj[0]);
    // console.log(winnerObj[1]);
    // console.log(winnerObj[2]);
    // console.log(props.IGplayerNum)
    // console.log(props.IGplayerNum.sort())
    const count = useRef<[number,number]>([0,0])
    for(let i =0 ; i <props.IGplayerNum.length; i++){
        if(count.current[1] < props.IGplayerNum[i] ){
            count.current = [props.IGplayerNum[i],i]
        }
    }
    leaderbord.push(count.current)
    for( let i=0 ; i <props.IGplayerNum.length; i++ ){
        if( i != count.current[1] && count.current[0] == props.IGplayerNum[i] ){
            leaderbord.push([props.IGplayerNum[i],i])
        }
    }
    for(let i =0 ; i <props.IGplayerNum.length; i++){
        if(leaderbord[0][1] != i){
            // console.log(leaderbord.includes([props.IGplayerNum[i],i]));
            
            // console.log([props.IGplayerNum[i],i]);            
            leaderbord.push([props.IGplayerNum[i],i])
        }
    }
    
    // for(let i =0 ; i <props.IGplayerNum.length - 1; i++){
    //     leaderbord.push(props.IGplayerNum.sort()[i])
    // }
    //  console.log(leaderbord);
    // for(let value in winnerObj ){
    //     console.log(winnerObj[value]);
        
    // }
    

    return(
        <>
            <div className={`flex flex-col items-center  w-[327px] md:w-[654px] h-[488px] md:h-[702px] absolute left-[24px] md:left-[57px] lg:left-[393px] ${props.winner?"transition-700 ease-out top-[90px] md:top-[161px] ":"transition-700 ease-in top-[-488px] md:top-[-702px] "} px-[24px] md:px-[56px] pt-[32px] md:pt-[51px] pb-[24px] md:pb-[69px] bg-[#FFF] rounded-[10px] `} >
                <h1 className="text-[24px] md:text-[48px] text-[#152938] mb-[9px] md:mb-[16px] " >{ leaderbord && leaderbord[1] && leaderbord[0] && leaderbord[0][0] == leaderbord[1][0]? "It’s a tie!":`Player ${leaderbord[0][1] + 1} Wins! `}</h1>
                <p className="text-[14px] md:text-[18px] text-[#7191A5] mb-[24px] md:mb-[40px] " >Game over! Here are the results…</p>
                <div className="w-[100%] h-[216px] md:h-[336px] flex flex-col justify-between mb-[24px] md:mb-[56px] " >
                    {leaderbord.map((items,index) => {
                        // console.log(items[0]);
                        // console.log(leaderbord[0][0]);
                        
                        return(
                            <>
                                <div className={` w-[100%] h-[48px] md:h-[72px] flex items-center justify-between ${index == 0 || items[0] == leaderbord[0][0]?"bg-[#152938]":"bg-[#DFE7EC]"} px-[16px] md:pc-[32px] rounded-[5px] md:rounded-[10px] `} >
                                    <div className="flex" ><p className={` text-[13px] md:text-[18px] ${index == 0 || items[0] == leaderbord[0][0]?"text-[#FCFCFC]":"text-[#7191A5]"} mr-[5px] `} >Player {items[1] +1}</p><p className={`text-[13px] md:text-[18px] text-[#FCFCFC] ${index == 0 || items[0] == leaderbord[0][0]?"":"hidden"}  `} >(Winner!)</p></div>
                                    <p className={`text-[20px] md:text-[32px] ${index == 0 || items[0] == leaderbord[0][0]?"text-[#FCFCFC]":"text-[#304859]"} `} >{items[0]} Pairs</p>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="flex flex-col md:flex-row w-[100%] gap-[16px] md:gap-[14px] " >
                    <button className="w-[100%] md:w-[264px] h-[48px] md:h-[52px] flex items-center justify-center bg-[#FDA214] rounded-[26px] " onClick={() => {props.setWinner(false);window.location.reload()}} ><p className="text-[18px] md:text-[20px] text-[#FCFCFC] " >Restart</p></button>
                    <button className="w-[100p%] md:w-[264px] h-[48px] md:h-[52px] flex items-center justify-center bg-[#DFE7EC] rounded-[26px] " onClick={() => {props.setWinner(false); navigate("/"); window.location.reload()  } } ><p className="text-[18px] md:text-[20px] text-[#304859] " >Setup New Game</p></button>
                </div>
            </div>
        </>
    )
}
export default Winner