import React, { useState } from "react";
import { postRateContent, setViewContent } from "../../API/ContentAPI";
import { Content } from "../../Utils/Interfaces";
import Alert from "../Alert/Alert";
import "./ContentCard.scss"



const ContentCard = ({ content, index, token }: { content: Content | undefined, index: number, token: string }) => {
  const [rate, setRate] = useState<number>(1);
  const [formErrors, setFormErrors] = useState<String[]>([]);

  let classname = "";
  switch (content?.type) {
    case "Película":
      classname = "movie";
      break;
    case "Serie":
      classname = "serie";
      break;
    default:
      break;
  }
  const rateContent = async (rate:number, contentId:string|undefined, token:string) => {
    try {
      const response = await postRateContent(rate, contentId, token);
    } catch (error:any) {
      console.log(error);
      if (error && typeof error === "object" && error.response.data.message )
      setFormErrors([ `${error.response.data.message}`]);
    }
  };
  const viewContent = async (contentId:string|undefined, token:string) => {
    try {
      const response = await  setViewContent(contentId, token);
    } catch (error:any) {
      console.log(error);
      if (error && typeof error === "object" && error.response.data.message )
      setFormErrors([ `${error.response.data.message}`]);
    }
  };

  const handleSetView=(e:any) => {
    e.preventDefault();
    viewContent(content?.id, token)
  }
  
  const handleRate=(e:any) => {
    e.preventDefault()
    rateContent(rate, content?.id, token)
  }
  return (
    <div className={`card-container ${content?.dayPick ? "day-pick" : ""}`}>
      <Alert messages={formErrors} type="error"/>
      <br />
      <div className={`card ${classname}`}>
        <img src={`https://loremflickr.com/320/240?random=${index}`} alt="Avatar" style={{ "width": "100%", "borderRadius": "5% 5% 0 0" }} />
        <div className="container">
          <p className="type"><i>Tipo: {content?.type}</i></p>
          <h4 className="title">Titulo: {content?.name}</h4>
          <h5 className="gender">Genero: <b>{content?.gender}</b></h5>
          <p className="rating">Valoracion: {content?.rating}</p>
          <p className="views">Visualizaciones: {content?.numberOfViews}</p>
        </div>
        <div className="actions">
          <button style={{margin: "0 0 5px 0"}} onClick={handleSetView} >Marcar como Vista</button>
          <form  className="actions">
          <div className="actions">
            <div className="form-label" style={{margin: "0 0 5px 0"}}>
              Puntuar(1-5):
            </div>
            <input type="range" style={{margin: "0 0 5px 0"}} value={rate} min="1" max="5" onChange={(e) => setRate( parseInt(e.target.value) )} />

          </div>
          <button style={{margin: "0 0 10px 0"}}  onClick={handleRate}>Valorar</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
export default ContentCard;