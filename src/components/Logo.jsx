import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {

    const navigate = useNavigate();

    const home = () => {
        navigate('/home');
    }

    return(
        <div className="Logo"> 
            <img className="Logo-image" onClick={home}  src="/image/logo.gif" alt="MovieBook" />
        </div>
    );
}

export default Logo;
