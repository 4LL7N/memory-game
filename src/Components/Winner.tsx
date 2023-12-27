import { useRef } from "react"

function Winner(props:{winner:boolean,setWinner:(winner:boolean) => void,IGplayerNum:number[]}){
    let winnerHead = "player 3 is winner"
    let leaderbord = []
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
            console.log(leaderbord.includes([props.IGplayerNum[i],i]));
            
            console.log([props.IGplayerNum[i],i]);            
            leaderbord.push([props.IGplayerNum[i],i])
        }
    }
    
    // for(let i =0 ; i <props.IGplayerNum.length - 1; i++){
    //     leaderbord.push(props.IGplayerNum.sort()[i])
    // }
     console.log(leaderbord);
    // for(let value in winnerObj ){
    //     console.log(winnerObj[value]);
        
    // }
    

    return(
        <>
            <div className={`flex flex-col items-center  w-[327px] h-[488px] absolute left-[24px] ${props.winner?"transition-700 ease-out top-[90px] ":"transition-700 ease-in top-[-488px] "} px-[24px] pt-[32px] pb-[24px] bg-[#FFF] `} >
                <h1 className="text-[24px] text-[#152938] mb-[9px] " >{winnerHead}</h1>
                <p className="text-[14px] text-[#7191A5] mb-[24px] " >Game over! Here are the results…</p>
            </div>
        </>
    )
}
export default Winner