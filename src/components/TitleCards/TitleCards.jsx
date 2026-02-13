import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyYWU5YjM0YTllNmU3MWNkZTA1NjBkYzc2NzY3MyIsIm5iZiI6MTc3MDkxMjYzNC43NDUsInN1YiI6IjY5OGRmYjdhMWZmNzMyMWNlZGU5ZmJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cjJBHiwGQJ7fRvJDLNP0n7Fws9uPawQsfnpHbx1uS9A'
  }
};
  
const handelWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handelWheel)
},[]);
  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return <div className="card" key={index}>
             <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards