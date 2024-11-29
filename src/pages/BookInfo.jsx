import LogoWithMypage from "../components/LogoWithMypage";
import { useLocation } from "react-router-dom";
import BottomNavigationBar from "../components/BottomNavigationBar";

function BookInfo(){
    const location=useLocation();
    const {bookTitle, author, publisher, bookImage, bookDescription} = location.state || {};
    return(
        <div>
            <LogoWithMypage/>

            <div className="container">
                    <h1>{bookTitle}</h1>
                    <h3>{author} | {publisher}</h3>
                    <div className="book">
                        <img className="bookImage" src={bookImage} alt={bookTitle}/>
                        <h5 className="bookDescription">{bookDescription}</h5>
                    </div>
                    <h1>책 추천이 마음에 드셨나요?</h1>
                    <div className="buttonContainer">
                        <button className="goodButton" onClick={null}>
                            <h5>좋아요!</h5>
                        </button>
                        <button className="badButton" onClick={null}>
                            <h5>싫어요!</h5>
                        </button>
                    </div>
                </div>
                <BottomNavigationBar/>
        </div>
    )
}

export default BookInfo;