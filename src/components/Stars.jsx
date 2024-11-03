import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

function Stars({ rate, onRateChange }) {
    const [rateScore, setRateScore] = useState(rate);

    const handleStarClick = (newRate) => {
        setRateScore(newRate);
        if (onRateChange) {
            onRateChange(newRate);  
        }
    };

    return (
        <div>
            {[...Array(rateScore)].map((_, i) => (
                <FaStar className="star-lg" key={i} onClick={() => handleStarClick(i + 1)} />
            ))}
            {[...Array(5 - rateScore)].map((_, i) => (
                <FaRegStar className="star-lg" key={i} onClick={() => handleStarClick(rateScore + i + 1)} />
            ))}
        </div>
    );
}

export default Stars;
