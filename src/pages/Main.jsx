import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Main(){
    const navigate = useNavigate();
    const [mainLogo, setMainLogo] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(()=>{
        setTimeout(()=>{
            setMainLogo(false);
        }, 3000)
    })
    useEffect(()=>{
        if(mainLogo===false){
                if(token===null){
                    navigate('/login');
                }
                else{
                    navigate('/home');
                }
            }
    })
    return(
            <div className="mainLogoDiv">
                <img className="mainLogo" src="/image/logo.gif" alt="MovieBook"/>
            </div>
    )
}
export default Main;