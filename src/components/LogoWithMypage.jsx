import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoWithMypage() {
    const navigate = useNavigate();
    const [isGifVisible, setIsGifVisible] = useState(true); // GIF 표시 여부
    const gifDuration = 2000; // GIF 재생 시간 (2초)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGifVisible(false); // GIF -> JPG 전환
        }, gifDuration);

        return () => clearTimeout(timer); // 타이머 정리
    }, []);

    return (
        <div className="Logo">
            {isGifVisible ? (
                <img
                    onClick={() => navigate('/home')}
                    className="logoImage"
                    src="/image/logo.gif"
                    alt="MovieBook"
                />
            ) : (
                <img
                    onClick={() => navigate('/home')}
                    className="logoImage"
                    src="/image/logo.jpg"
                    alt="MovieBook"
                />
            )}
            <img
                onClick={() => navigate('/profile')}
                className="mypage"
                src="/image/mypage.png"
                alt="mypage"
            />
        </div>
    );
}

export default LogoWithMypage;
