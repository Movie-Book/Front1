import axios from "axios";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";




function FriendButton(props){

    return(
        <div className="friendButton">
            <div className='favorite' onClick={props.toggleStar}>
                {props.favorite ? <FaStar className="favoriteStar"/> : <FaRegStar className="favoriteStar"/>} 
            </div>
            <h3 className="friendName" onClick={props.onClick}>{props.name}</h3>
        </div>
    )
}

export default FriendButton;