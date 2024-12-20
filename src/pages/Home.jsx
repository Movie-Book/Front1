import LogoWithMypage from "../components/LogoWithMypage";
import BookRecommendation from "../components/BookRecommendation";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(){
    const navigate=useNavigate();
    const location=useLocation();

    const [recommendedBooks, setRecommendedBooks] = useState(
        (location.state?.bookInfo || []).filter((book, index, self) =>
            index === self.findIndex(b => b.bookName === book.bookName)
        )
    );
    
    const [currentBookIndex, setCurrentBookIndex] = useState(0);

    const bookTitle="어린왕자";
    const bookDescription="비행기 사고로 사하라 사막에 불시착한 '나'는 그곳에서 어린 왕자를 만납니다. 아주 작은 떠돌이별에서 자존심 강한 장미꽃 한 송이와 함께 살던 그는 장미꽃의 투정에 마음이 상해 그 별을 떠났지요. 여행 중에 어린 왕자는 여러 별을 거쳤습니다. 이 별들은 모두 어린 왕자 자신의 별처럼 아주 작은 떠돌이별이어서 한 사람씩밖에 살고 있지 않았지요. 그곳에서 어린 왕자가 만난 사람은 왕과 허영심 가득한 남자, 주정뱅이, 상인, 가로등 관리하는 사람, 지리학자였습니다. 그들은 하나같이 이상한 어른들이었지요. 그리고 마침내 어린 왕자는 지구로 오게 되었습니다. 지구에서 어린 왕자가 처음 만난 것은 뱀이었습니다. 뱀은 어린 왕자에게, 언제고 떠나온 별이 그리우면 도와줄 수 있다고 말하지요. 그리고 어린 왕자는 여우를 만났습니다. 여우는 어린 왕자에게 '길들인다'는 것의 의미와 책임, '잘 보려면 눈이 아니라 마음으로 보아야 한다.'는 것을 가르쳐 주지요. 그래서 어린 왕자는 정원을 가득 메운 장미꽃들보다 자신과 관계를 맺은 장미꽃 한 송이가 더 소중하다는 것을 알게 됐고, 그 자존심 강하지만 한없이 약한 장미꽃이 새삼스레 걱정스러워집니다. 지구에 온 지 꼭 1년이 되는 날, 어린 왕자는 강한 독을 지닌 뱀에게 물려 쓰러집니다. 서로를 길들이며 관계를 맺었던 그 약하고 순진한 장미꽃에 대한 책임을 다하기 위해 자신의 별로 떠난 거지요. '나'는 밤하늘의 별을 바라볼 때마다 어린 왕자의 장미꽃, 그리고 어린 왕자에게 그려 준 양을 생각하며 행복감에, 또는 슬픔에 잠깁니다."
 
    console.log(recommendedBooks);

    useEffect(()=>{
        const loadingHome = async() => {
            const books = await BookRecommend();
            setRecommendedBooks(prevBooks => {
                const uniqueBooks = [...prevBooks, ...books].filter((book, index, self) =>
                    index === self.findIndex(b => b.bookName === book.bookName)
                );
                return uniqueBooks;
            });
            
        };
        loadingHome();
    },[]);

    const BookRecommend = async () => {
      try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          const response = await axios.post(
              'http://35.216.42.151:8080/api/v1/book/recommend', 
              {}, 
              {
                  headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: `Bearer ${token}`
                  }
              }
          );
          if (response.status === 200) {
              console.log("추천 도서 리스트입니다");
              return response.data;
          }
      } catch (error) {
          if (error.response) {
              if (error.response.status === 400) {
                  console.log('도서 추천에 실패했습니다');
              } else if (error.response.status === 403) {
                  console.log('유효성검사 실패');
              } else {
                  console.error('Error : ', error);
                  console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
                  console.error("Error:", error.response || error.message);
              }
          }
          return [];
      }
  };
  

  const newRecommendation = () => {
    if (recommendedBooks.length > 0) {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % recommendedBooks.length);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 스크롤을 맨 위로 부드럽게 이동
    }
};


    const toBookInfo=()=>{
        const currentBook = recommendedBooks[currentBookIndex];
        navigate('/bookInfo', {
            state : {
                bookImage:currentBook.image,
                bookTitle : currentBook.bookName,
                author : "",
                publisher : "",
                bookDescription:currentBook.description,
                bookDescriptionStyle:true
            }
        });
    }

    return (
        <div>
            <LogoWithMypage/>
                <div className="container">
                    <h1>당신을 위한 오늘의 책</h1>
                    <div className="bookContainer">
                        {
                            recommendedBooks.length > 0 &&(
                                <BookRecommendation 
                                    onClick={toBookInfo} 
                                    bookImage={recommendedBooks[currentBookIndex]?.image}
                                    bookTitle={recommendedBooks[currentBookIndex]?.bookName} 
                                    bookDescription={recommendedBooks[currentBookIndex]?.description}/>
                            )
                        }
                    </div>
                    <div className="newRecommendationButton" onClick={newRecommendation}>
                        <img src="./image/new.png" alt="new"></img>
                        <h3>새로운 책 추천 보기</h3>
                    </div>
                </div>
                <BottomNavigationBar/>
        </div>
    );
}

export default Home;
