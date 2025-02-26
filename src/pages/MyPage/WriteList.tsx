import { useState, useEffect } from 'react'
import style from './myPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MyWritePage = () => {
  const { userId } = useParams();

  type my = {
    name: string;
    body: string;
    id: string;
  }

  // const [lock, setLock] = useState<boolean>(false) 부가기능 추후 추가
  const [myData, setData] = useState<my[]>()


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(myData)
      })
      .catch((error) => console.log(error));
  }, [myData]);

  // Search
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate();

  // search 값 불러오기
  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // router 반영
  const changeNavigate = (url: string) => {
    if(url != '')
      navigate(`/${userId}?q=${url}`)
    else 
      navigate(`/${userId}`)
  }

  // 함수 호출
  useEffect(() => {
    changeNavigate(search)
  }, [search])

  // SearchFilter 함수 
  const filterTitle = myData?.filter((p) => {
    // 대소문자 통일 후 배열에 요소가 존재하는지 확인
    return p.name.replace(" ", "").toLocaleLowerCase().includes(search.replace(" ", "").toLocaleLowerCase())
  })

  // 배열에서 검색한 값만 불러오기
  const getSearchList = () => {
    if(filterTitle?.length !== 0){
      return (
        <div>
          {filterTitle?.map((item, index) => (
            <div key={item.id}>
              <div className={style.list} >
                <div className={style.contentImg}>
                  <img src='/public/images/배경.webp' alt="img" />
                </div>
                <h2>{ item.name }</h2>
                <p>{ item.body }</p>
                <div className={style.subInfo}>
                  <span>약 17시간 전</span>
                  <span>{ item.id }</span>
                  {/* 공개&비공개 여부 확인 / 추후 추가 확인
                  { lock ? (
                    <p>
                      <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"/></svg>
                      <span>비공개</span>
                    </p>
                  ) : (
                    <span>공개</span>
                  )} */}
                </div>
                <hr />
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className={style.notFound}>
          <p>일치하는 게시글이 없습니다.</p>
        </div>
      )
    }
  }

  // 배열에서 값불러오기
  const getList = () => {
    return (
      <div>
        {myData?.map((item, index) => (
          <div key={ index }>
            <div className={style.list} >
              <div className={style.contentImg}>
                <img src='/public/images/배경.webp' alt="img" />
              </div>
              <h2>{ item.name }</h2>
              <p>{ item.body }</p>
              <div className={style.subInfo}>
                <span>약 17시간 전</span>
                <span>댓글 수</span>
                <span>좋아요 수</span>
                {/* 공개&비공개 여부 확인 / 추후 추가 확인
                { lock ? (
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"/></svg>
                    <span>비공개</span>
                  </p>
                ) : (
                  <span>공개</span>
                )} */}
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={style.container}>
      <div className={style.myPage}>
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src='/public/images/짱구.jpeg' alt="image" className={style.myImage}/>
            </div>
            <h2>profile</h2>
          </div>
          <div className={style.introBox}>
            <h2>한 줄 소개</h2>
            <div className={style.intro}>
              hello my name is mini nice me too. <br></br>i can't speak english
            </div>
          </div>
        </div>
        <hr />
        <div className={style.myList}>
          {/* 목록 */}
          <div className={style.body}>
            <div className={style.serBox}>
              <section className={style.serSec}>
                <div className={style.search}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 -960 960 960"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
                  <input type="text" placeholder='검색어를 입력하세요.' onChange={inputSearch}/>
                </div>
              </section>
            </div>
            {/* 글 목록 */}
            { search ? getSearchList()
              :getList()
            }
          </div>
        </div>
      </div>
    </div>
  )


}

export default MyWritePage