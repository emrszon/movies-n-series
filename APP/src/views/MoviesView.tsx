import React, { useContext, useEffect, useState } from "react";
import { getContent, getRandomContent } from "../API/ContentAPI";
import ContentCard from "../Components/ContentCard/ContentCard";
import { AuthContext } from "../Context/AuthContext";
import { Content } from "../Utils/Interfaces";
import { FILTER_FIELDS, SORT_FIELDS, SORT_WAYS, TYPES } from "../Utils/Variables";

const MoviesPage = ({ }) => {

  const ws = new WebSocket("ws://localhost:3001/api/ws");
  const [movieOfTheDay, setmovieOfTheDay] = useState<undefined | Content>(undefined)
  const [movieRandom, setMovieRandom] = useState<undefined | Content>(undefined)
  const { userData } = useContext(AuthContext);
  const [movies, setMovies] = useState<Array<Content>>([])
  const [filters, setFilters] = useState({ orderBy: "name", orderWay: "asc", filterBy: "name", filterValue: "" })

  const getMovies = async () => {
    try {
      const response = await getContent("", filters.orderBy, filters.orderWay, filters.filterBy, filters.filterValue, userData.token);

      if (response) {
        setMovies(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!movies) {
      getMovies()
    }
  }, [movies])
  const setupWs = () => {
    ws.onopen = () => {
    };
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      setmovieOfTheDay(data.movie)
    };
  };
  const getMovieOfTheDay = (ws: any, userData: any) => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ userData, action: "getMovieOfTheDay" }))
      return
    }
    setTimeout(function () {
      getMovieOfTheDay(ws, userData);
    }, 1000);
  }

  const getRandomMovie = async () => {
    try {
      const response = await getRandomContent("peli",userData.token);

      if (response) {
        setMovieRandom(response.result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupWs();
  })

  const handleClickGetMovies = async (e: any) => {
    e.preventDefault();
    await getMovies();
  }


  useEffect(() => {
    if (!movieOfTheDay) {
      getMovieOfTheDay(ws, userData)
    }
  }, [movieOfTheDay])

  useEffect(() => {
    if (!movieRandom) {
      getRandomMovie()
    }
  }, [movieRandom])

  const handleClickGetRandom = async() => {
    await getRandomMovie();
  }



  return (
    <>
      <section className="day-pick-section">
        <div className="page-title">
          <h1 >Película del dia </h1>
        </div>
        <div className="day-pick-container">
        <ContentCard content={movieOfTheDay} key={0} index={0} token={userData.token}/>
        </div>
      </section>

      <section className="">
        <div>
        <h1 >Película aleatoria</h1> 
        <button onClick={handleClickGetRandom}>Voy a tener suerte</button>
        </div>

        <div>
          <ContentCard content={movieRandom} key={1} index={10} token={userData.token}/>
        </div>
      </section>

      <section>
        <div className="page-title">
          <h1>Todo el Contenido</h1>
        </div>
        <div>
          <form className="filters">
          <div className="form-group">
            <div className="form-label">
              Filtrar Por:
            </div>
            <select name="cars" id="cars" value={filters.filterBy} onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}>
              {Object.entries(FILTER_FIELDS).map((entries) => {
                return <option value={entries[0]}>{entries[1]}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <div className="form-label">
              Valor:
            </div>
            <input type="text" value={filters.filterValue} onChange={(e) => setFilters({ ...filters, filterValue: e.target.value })} />
          </div>
          <div className="form-group">
            <div className="form-label">
              Ordenar Por:
            </div>
            <select name="cars" id="cars" value={filters.orderBy} onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}>
              {Object.entries(SORT_FIELDS).map((entries) => {
                return <option value={entries[0]}>{entries[1]}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <div className="form-label">
              Sentido:
            </div>
            <select name="cars" id="cars" value={filters.orderWay} onChange={(e) => setFilters({ ...filters, orderWay: e.target.value })}>
              {Object.entries(SORT_WAYS).map((entries) => {
                return <option value={entries[0]}>{entries[1]}</option>
              })}
            </select>
          </div>
          <br />
          <button onClick={handleClickGetMovies}> Filtrar contenido</button>
        </form>
        </div>
        
        <div className="content-container">
          {movies.map((movie, index) => {
            return <ContentCard content={movie} key={index} index={index}  token={userData.token}/>
          })}

        </div>
      </section>

    </>
  );
}

export default MoviesPage;