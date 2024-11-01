import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {

    const navigate = useNavigate();

    const home = () => {
        navigate('/home');
    }

    return(
        <div className="Logo"> 
<<<<<<< HEAD
            <img className="Logo-image" onClick={home}  src="/image/logo.gif" alt="MovieBook" />
=======
            <img  onClick={home}  src="/image/logo.gif" alt="MovieBook" />
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1
        </div>
    );
}

export default Logo;
