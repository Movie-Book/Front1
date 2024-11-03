import React from "react";
import { useNavigate } from "react-router-dom";

function LogoWithMypage(){
    const navigate = useNavigate();

    return(
        <div className="Logo2"> 
            <img  onClick={() => navigate('/home')}  className="logoImage" src="/image/logo.gif" alt="MovieBook" />
            <img onClick={() => navigate('/profile')} className="mypage" src="/image/mypage.png" alt="mypage"></img>
        </div>
    );
}

export default LogoWithMypage;