import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();
    const [isGifVisible, setIsGifVisible] = useState(true); // GIF 표시 여부
    const gifDuration = 2000; // GIF 재생 시간 (2초)

    const home = () => {
        navigate('/');
    };

    useEffect(() => {
        if (isGifVisible) {
            const timer = setTimeout(() => {
                setIsGifVisible(false); // GIF -> JPG 전환
            }, gifDuration);
            return () => clearTimeout(timer); // 타이머 정리
        }
    }, [isGifVisible]);

    return (
        <div className="Logo">
            {isGifVisible ? (
                <img
                    className="centerLogoImage"
                    onClick={home}
                    src="/image/logo.gif"
                    alt="MovieBook"
                />
            ) : (
                <img
                    className="centerLogoImage"
                    onClick={home}
                    src="/image/logo.jpg"
                    alt="MovieBook"
                />
            )}
        </div>
    );
}

export default Logo;
