import { FaRegStar, FaStar } from 'react-icons/fa';


function Stars({rate=0, setRate, rating=true}){

    return(
        <div className="stars">
            {[...Array(rate)].map((a, i) => (
                <FaStar className="star" key={i} onClick={rating===false? null : () => setRate(i + 1)} />
            ))}
            {[...Array(5 - rate)].map((a, i) => (
                <FaRegStar className="star" key={i} onClick={rating===false? null : () => setRate(rate + i + 1)} />

            ))}
        </div>
    );
}

export default Stars;
