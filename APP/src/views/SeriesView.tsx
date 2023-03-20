import React, { useContext, useEffect, useState } from "react";
import { getContent } from "../API/ContentAPI";
import ContentCard from "../Components/ContentCard/ContentCard";
import { AuthContext } from "../Context/AuthContext";
import { Content } from "../Utils/Interfaces";
import { FILTER_FIELDS, SORT_FIELDS, SORT_WAYS } from "../Utils/Variables";

const SeriesPage = ({ }) => {

  const [series, setSeries] = useState<Array<Content>>([])
  const { userData } = useContext(AuthContext);
  const [filters, setFilters] = useState({ orderBy: "name", orderWay: "asc", filterBy: "name", filterValue: "" })

  const getSeries = async () => {
    try {
      const response = await getContent("series", filters.orderBy, filters.orderWay, filters.filterBy, filters.filterValue, userData.token);

      if (response) {
        setSeries(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!series) {
      getSeries()
    }
  }, [series])

  const handleClickGetSeries = async (e: any) => {
    e.preventDefault();
    await getSeries();
  }




  return (
    <>
      <div>
        <div className="page-title">
          <h1>Series</h1>
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
          <button onClick={handleClickGetSeries}> Obtener Series</button>
        </form>
        </div>
        
        <div className="content-container">
          {series.map((serie, index) => {
            return <ContentCard content={serie} key={index} index={index}  token={userData.token}/>
          })}

        </div>
      </div>

    </>
  );
}

export default SeriesPage;