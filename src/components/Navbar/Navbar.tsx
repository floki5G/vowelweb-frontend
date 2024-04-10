import { useNavigate } from "react-router-dom";
import { CartPopup } from "../../common/CartPopup/CartPopup";

export function Navbar() {
    const navigate = useNavigate()
    return (
        <div className=" w-full  h-14 flex justify-between items-center shadow-lg	px-4">
            <button className=" text-2xl font-bold underline bg-slate-400 rounded-lg px-2 py-1 "  onClick={()=>navigate('/')}>
                Volweleb
            </button >
            <div>
            <CartPopup/>
            </div>
        </div>
    )
}