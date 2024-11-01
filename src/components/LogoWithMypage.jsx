import React from "react";
import { useNavigate } from "react-router-dom";

function LogoWithMypage(){
    const navigate = useNavigate();

<<<<<<< HEAD
    return(
        <div className="Logo2"> 
            <img  onClick={() => navigate('/home')}  className="logoImage" src="/image/logo.gif" alt="MovieBook" />
            <img onClick={() => navigate('/profile')} className="mypage" src="/image/mypage.png" alt="mypage"></img>
=======
    const home = () => {
        navigate('/home');
    }
    return(
        <div className="Logo2"> 
            <img  onClick={home}  className="logoImage" src="/image/logo.gif" alt="MovieBook" />
            <img onClick={null} className="mypage" src="/image/mypage.png" alt="mypage"></img>
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1
        </div>
    );
}

export default LogoWithMypage;