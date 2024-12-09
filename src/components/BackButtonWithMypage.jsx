import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BackButtonWithMypage(props){
    const navigate = useNavigate();
    const location = useLocation();
    const back = () => {
        if (["/search", "/mymovie", "/mybook"].includes(location.pathname)) {
            navigate("/home");
        } else {
            navigate(-1);
        }
        
    }
    return(
        <div className="Logo"> 
            {["/search", "/mymovie", "/mybook"].includes(location.pathname) ? (<img
                onClick={() => navigate('/home')}
                className="logoImage"
                src="/image/logo.jpg"
                alt="MovieBook"
            />) : (
            <img  onClick={back}  className="back" src="/image/back.png" alt="back" />)}
            <h3 className="info">{props.title}</h3>
            <img onClick={() => navigate('/profile')} className="mypage" src="/image/mypage.png" alt="mypage"></img>

        </div>
    );
}

export default BackButtonWithMypage;