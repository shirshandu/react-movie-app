import React, { useState, useEffect } from "react";
import Movie from "./components/Movie.component";
import "./App.css";

// Allowed Values: , popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
// default: popularity.desc
const sortBy = 'popularity.desc';

const abdc = `string text ${sortBy} string text`;

console.log(abdc)

const API_URL =
  `https://api.themoviedb.org/3/discover/movie?sort_by=${sortBy}&api_key=891a57911ee13fea09beacad7d6c8a2f&page=1`
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=891a57911ee13fea09beacad7d6c8a2f&query=";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
  };

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };


  const handlerOnChange = (event) => {
    console.log('on change')
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <form onSubmit={handlerOnSubmit}>
        <header>
          <input 
            className="search" 
            type="search" 
            placeholder="Search" 
            onChange={handlerOnChange}
          />
        </header>
      </form>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
