import React from "react";

function BottomButton({text, onClick, disabled, backgroundColor}) {
    const buttonStyle = {
        backgroundColor : backgroundColor? backgroundColor : '#d04040' ,
        color : '#ffffff',
        width : '100%',
        fontSize : '25px',
        fontWeight : 'bold',
        border : 'none',
        margin : '20px 0px',
    }
    const divStyle = {
        backgroundColor : '#ffffff',
        position : 'sticky',
        bottom : '0',
        width: '100%',
        alignItems : 'center',
        justifyContent : 'center',
        padding : '5px 0px'
    }
    return(
        <div style={divStyle}>
            <button style={buttonStyle} onClick={onClick} disabled={disabled}><h3>{text}</h3></button>
        </div>
    );
}

export default BottomButton;