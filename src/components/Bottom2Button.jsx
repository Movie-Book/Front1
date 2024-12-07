import React from "react";

function Bottom2Button({text1, text2, onClick1, onClick2, disabled}) {
    const buttonStyle1 = {
        backgroundColor : '#ffffff',
        color : '#d04040',
        width : '100%',
        fontSize : '25px',
        fontWeight : 'bold',
        border : '5px solid #d04040',
        margin : '20px 0px',
    }
    const buttonStyle2 = {
        backgroundColor : '#d04040',
        color : '#ffffff',
        width : '100%',
        fontSize : '25px',
        fontWeight : 'bold',
        border : '3px solid #d04040',
        margin : '5px 0px',
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
            <button style={buttonStyle1} onClick={onClick1}><h3>{text1}</h3></button>
            <button style={buttonStyle2} onClick={onClick2} disabled={disabled}><h3>{text2}</h3></button>
        </div>
    );
}

export default Bottom2Button;