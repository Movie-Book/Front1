import React from "react";
import { useNavigate } from "react-router-dom";

function BackButtonWithMypage(){
    const navigate = useNavigate();

    return(
        <div className="Logo"> 
            <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
            <h3 className="info">영화검색</h3>
            <img onClick={() => navigate('/profile')} className="mypage" src="/image/mypage.png" alt="mypage"></img>

        </div>
    );
}

export default BackButtonWithMypage;