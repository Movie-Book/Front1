import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BackButtonWithMypage(props){
    const navigate = useNavigate();
    const location = useLocation();
    const back = () => {
        if(location.pathname==="/search")
            navigate("/home");
        else if(location.pathname==="/mymovie")
            navigate("/home");
        else if(location.pathname==="/mybook")
            navigate("/home");
        else
            navigate(-1);
    }
    return(
        <div className="Logo"> 
            <img  onClick={back}  className="back" src="/image/back.png" alt="back" />
            <h3 className="info">{props.title}</h3>
            <img onClick={() => navigate('/profile')} className="mypage" src="/image/mypage.png" alt="mypage"></img>

        </div>
    );
}

export default BackButtonWithMypage;