
import { useNavigate } from "react-router-dom";

function Igmenu(props:{igmenu:boolean,setIgmenu:(igmenu:boolean) => void,buttonNum:string[],timer:string,setTimer:(timer:string) => void }){
    const navigate = useNavigate()
    return(
        <>
            <div className={`w-[327px] h-[224px] flex flex-col p-[24px] gap-[16px] bg-[#FFF] rounded-[10px] absolute left-[24px] ${props.igmenu?"duration-700 ease-out top-[222px]":" duration-700 ease-in top-[-225px]"} `} >
                <button className="w-[279px] h-[48px] rounded-[26px] bg-[#FDA214] " ><p className="tetx-[18px] text-[#FCFCFC] " onClick={() => {window.location.reload()}} >Restart</p></button>
                <button className="w-[279px] h-[48px] rounded-[26px] bg-[#DFE7EC] " ><p className="tetx-[18px] text-[#304859] " onClick={() => {navigate("/");window.location.reload()}} >New Game</p></button>
                <button className="w-[279px] h-[48px] rounded-[26px] bg-[#DFE7EC] " ><p className="tetx-[18px] text-[#304859] " onClick={() => props.setIgmenu(false) } >Resume Game</p></button>
            </div>
        </>
    )
}

export default Igmenu