import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookTasteButton from "../components/BookTasteButton";
import axios from "axios";

function FriendInfo(){
    const location = useLocation();
    const name = location.state?.id || "___";
    const navigate = useNavigate();
    const [starRating, setStarRating] = useState({});
    const [books, setBooks] = useState([]);


    const friendRecommendedBook = async(name) => {
        try{
            const token = localStorage.getItem('token');
    
            const response = await axios.get(`http://35.216.42.151:8080/api/v1/friend/${name}/book`, {
                headers : {
                    Authorization : `Bearer ${token}`
                },
            });
            if(response.status === 200){
                console.log(response.data.bookList);
                return response.data.bookList;
              }
            }
            catch(error){
              if(error.response){
                if(error.response.status===400){
                  console.log('잘못된 접근입니다.');
                }
                else if(error.response.status===403){
                  console.log('유효성검사 실패');
                }
                else{
                  console.error('Error : ',error);
                  console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.')
                }
              }
              return [];
            }
          }
        
          useEffect(() => {
            if (name) {
              friendRecommendedBook(name).then((bookList) => {
                setBooks(bookList || []); // 책 리스트 상태 업데이트
              });
            }
          }, [name]);

    return(
        <div>
            <div className="Logo">
                <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
                <h3 className="info">{name}</h3>
            </div>
            <div className="container">
                <h3>{name}님이 추천 받은 책</h3>
                <div className="movieContainer">
                {books.map((m) => (
                    <BookTasteButton 
                        key={m.bookTitle} 
                        onClick={null} 
                        bookImage = {m.image} 
                        bookTitle = {m.name} 
                        rate={m.rating || 0}
                        selected={m.rating > 0} 
                    />
                ))}
                </div>
            </div>
        </div>
        
    )
}

export default FriendInfo;